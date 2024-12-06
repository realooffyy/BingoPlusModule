import RenderLibV2 from "../../../RenderLibV2"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { registerWhen } from "../../utils/utils"
import { drawSlotBox, showTitle } from "../../render/utils"
import Window from "../../utils/Window"
import constants from "../../utils/constants"

// some logic from skytils
// https://github.com/Skytils/SkytilsMod/blob/1.x/src/main/kotlin/gg/skytils/skytilsmod/features/impl/misc/BrewingFeatures.kt

const brewingStandID = "minecraft:brewing_stand"
const coffeeIngredients = ["Enchanted Cake", "Enchanted Cookie", "Enchanted Rabbit Foot", "Enchanted Sugar Cane"]
const itemsIntoBrews = {
    "Cheap Coffee": coffeeIngredients,
    "Decent Coffee": coffeeIngredients,
    "Black Coffee": coffeeIngredients,
    "KnockOff™ Cola": ["Enchanted Blaze Rod"],
    "Dctr. Paper": ["Enchanted Gold Block"],
    "Pulpous Orange Juice": ["Enchanted Ghast Tear"],
    "Tepid Green Tea": ["Enchanted Cactus"],
    "Slayer© Energy Drink": ["Flint"],
    "Tutti-Frutti Flavored Poison": ["Feather"],
    "Bitter Iced Tea": ["Enchanted Cooked Mutton"],
    "Viking's Tear": ["Lapis Lazuli"]
}
const ingredientSlots = [38, 40, 42]

const timeRegex = /^§a(\d{1,2}.\d)s$/
// https://regex101.com/r/mgxH0O/1

let enabled = false

let brewingStands = []
let lastStand = null
let openedStand = null
// let lastServer = null
// potentially keep stands active if the server is still up, not sure if this would work though lol

/**
 * 
 * @returns {Array<{x: number, y: number, z: number, brewingEnd: number, ingredient: string, potions: string[]}>} currently loaded brewing stands
 */
export const getBrewingStands = () => { return brewingStands }

// todo: maybe move to utils
const compareCoords = (obj1, obj2) => {
    return (
        obj1.x === obj2.x &&
        obj1.y === obj2.y &&
        obj1.z === obj2.z
    )
}

// should stands be logged?
register("tick", () => {
    enabled = (
        (
            settings().brewingStandLoadedBox ||
            settings().brewingStandHighlightCorrectBrew
        ) 
        && Skyblock.area === "Private Island"
    )
})

// handle brewing stand interaction
register("playerInteract", (action) => {
    if (!enabled) return
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    const block = Player.lookingAt()
    if (block.type.getRegistryName() !== brewingStandID) return
    lastStand = {
        x: block.getX(),
        y: block.getY(),
        z: block.getZ(),
        brewingEnd: null,
        ingredient: null,
        potionAmount: 0
    }
})

// manage opened stand + storing stands
register("tick", () => {
    if (!enabled) return
    if (Window.getTitle() === "Brewing Stand") {
        if (lastStand === null) return
        if (!brewingStands.some(stand => compareCoords(stand, lastStand))) brewingStands.push(lastStand)
        openedStand = lastStand
        lastStand = null
    } else {
        if (openedStand) {
            return
            // temporarily disabled
            // feature (warn if missing potions)
            const potions = openedStand?.potionAmount
            if ([1, 2].includes(potions)) {
                const potionsMissing = `${3 - potions} potion${potions === 1 ? "s" : ""}`
                if (settings().brewingStandWarnIfMissingPotions_chat)
                    ChatLib.chat(`${constants.PREFIX}&cYou left a brewing stand with ${potionsMissing} missing!`)
                if (settings().brewingStandWarnIfMissingPotions_sound)
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            World.playSound("note.pling", 100, 1)
                        }, i * 100)
                    }
                if (settings().brewingStandWarnIfMissingPotions_subtitle)
                    showTitle("", `&c${potionsMissing} missing from stand!`, 3000)
                }
 
            
            openedStand = null
        }
    }
})

// delete stand when broken
register("blockBreak", (block) => {
    if (!enabled) return
    if (block.type.getRegistryName() !== brewingStandID) return
    const brokenStand = {
        x: block.getX(),
        y: block.getY(),
        z: block.getZ()
    }
    brewingStands = brewingStands.filter(stand => !compareCoords(stand, brokenStand))
})

// get info from inside the brewing stand
register("tick", () => {
    if (!enabled) return
    if (!openedStand) return

    const inv = Player.getContainer()
    if (!inv) return
    
    let name, match

    // time left
    name = inv?.getStackInSlot(22)?.getName()
    if (name) {
        match = name.match(timeRegex);
        if (match) openedStand.brewingEnd = Date.now() + parseFloat(match[1]) * 1000
        else openedStand.brewingEnd = null
    }
    else openedStand.brewingEnd = null
    
    // ingredient
    name = inv?.getStackInSlot(13)?.getName()
    openedStand.ingredient = name ? ChatLib.removeFormatting(name) : null

    // potions
    openedStand.potionAmount = 0
    ingredientSlots.forEach(slot => {
        name = inv?.getStackInSlot(slot)?.getName()
        if (name) openedStand.potionAmount += 1
    })

    // deletes the stand in the same location
    const index = brewingStands.findIndex(stand => compareCoords(stand, openedStand))
    if (index !== -1) {
        brewingStands.splice(index, 1)
    }

    // finally push it
    brewingStands.push(openedStand)
})

// manage brewing time left
register("step", () => {
    if (!brewingStands) return
    const now = Date.now()
    brewingStands.forEach(stand => {
        if (now > stand.brewingEnd) stand.brewingEnd = null
    })
}).setFps(2)

// render box
registerWhen(register("renderWorld", () => {
    brewingStands.forEach(stand => {
        // r g b
        let colour = settings().brewingStandLoadedColour
        if (stand.brewingEnd) colour = settings().brewingStandCurrentlyBrewingColour
        RenderLibV2.drawInnerEspBox(stand.x + 0.5, stand.y + .1, stand.z + 0.5, .8, .8,
            colour[0]/255, colour[1]/255, colour[2]/255, colour[3]/255, false)
    })
}), () => settings().brewingStandLoadedBox && enabled && brewingStands)

// render highlight behind correct brew
registerWhen(register("renderItemIntoGui", (item, x, y) => {
    const name = item?.getName()
    if (!name) return

    ingredients = itemsIntoBrews[ChatLib.removeFormatting(name)]
    if (!ingredients) return
    ingredients.forEach(ingredient => {
        if (ingredient == openedStand?.ingredient) {
            drawSlotBox(x, y, 247)
        }
    })
    
}), () => settings().brewingStandHighlightCorrectBrew && enabled && openedStand?.ingredient)

// reset stands when unload
const reset = () => {
    enabled = false
    brewingStands = []
    lastStand = null
    openedStand = null
}
register("worldUnload", reset)