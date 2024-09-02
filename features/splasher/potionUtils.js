import { registerWhen } from "../../utils/utils"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"

const nameRegex = /^§\w(.*?) (Splash )?Potion$/ // https://regex101.com/r/aWdGG4/1
const loreRegex = /§(\w).*/ // https://regex101.com/r/kht3Li/2

// Show potion abbreviation
registerWhen(register("renderItemIntoGui", (item, x, y) => {
    const name = item.getName()
    if (!name.includes("Splash Potion")) return
    const text = name.slice(0,5) + "."

    Renderer.translate(x, y, 251) // 251 puts it behind the tooltip, in front of its texture, and in front of head other textures 
    Renderer.scale(0.6)
    Renderer.drawString(text, 0, 0)

}), () => settings().potionAbbreviation && Skyblock.inSkyblock)

// these functions will have a use eventually trust

/**
 * Gets all potions from the current inventory
 * @returns array with any potions found
 */
const getPotions = () => {
    let potions = []
    const items = Player.getContainer().getItems()
    let counter = 0
    items.forEach(item => {
        const potion = getPotion(item)
        if (potion) {
            potion.slotNumber = counter
            potions.push(potion)
        }
        counter++
    })
    return potions
}

/**
 * Attempts to get potion from an item
 * @param {*} item 
 * @returns potion object if successful, undefined if not
 */
const getPotion = (item) => {
    if (!item) return

    const potion = {
        isSplash: null,
        name: null,
        colour: null,
    }

    const name = item.getName()
    let match = name.match(nameRegex)
    if (match) {
        potion.name = match[1]
        potion.isSplash = match[2].includes("Splash")
    } else return

    [ _, potion.colour] = item.getLore()[1].match(loreRegex)
    
    // if any values are still null, cancel
    if (Object.values(potion).some(value => value === null)) return
    return potion
}