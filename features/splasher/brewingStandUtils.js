import RenderLib from "../../../RenderLib"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { registerWhen } from "../../utils/utils"
import { onInventoryClose } from "../../utils/Events"

// some logic from skytils
// https://github.com/Skytils/SkytilsMod/blob/1.x/src/main/kotlin/gg/skytils/skytilsmod/features/impl/misc/BrewingFeatures.kt

const brewingStandID = "minecraft:brewing_stand"

const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")

const timeRegex = /^§a(\d{1,2}.\d)s$/
// https://regex101.com/r/mgxH0O/1

let brewingStands = []
let lastStand = null
let openedStand = null
// let lastServer = null
// potentially keep stands active if the server is still up, not sure if this would work though lol

// todo: maybe move to utils
const compareCoords = (obj1, obj2) => {
    return (
        obj1.x === obj2.x &&
        obj1.y === obj2.y &&
        obj1.z === obj2.z
    )
}


// handle brewing stand interaction
register("playerInteract", (action) => {
    if (!settings().brewingStandLoadedBox) return
    if (Skyblock.area !== "Private Island") return
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    const block = Player.lookingAt()
    if (block.type.getRegistryName() !== brewingStandID) return
    lastStand = {
        x: block.getX(),
        y: block.getY(),
        z: block.getZ(),
        brewingEnd: null
    }
})

// push the latest stand if it doesn't exist
register("packetReceived", (packet) => {
    if (!settings().brewingStandLoadedBox) return
    if (lastStand === null) return
    if (!packet.func_179840_c().func_150254_d().removeFormatting() === "Brewing Stand") return
    if (!brewingStands.some(stand => compareCoords(stand, lastStand)
    )) brewingStands.push(lastStand)
    openedStand = lastStand
    lastStand = null
}).setFilteredClass(S2DPacketOpenWindow)

// delete stand when broken
register("blockBreak", (block) => {
    if (!settings().brewingStandLoadedBox) return
    if (block.type.getRegistryName() !== brewingStandID) return
    const brokenStand = {
        x: block.getX(),
        y: block.getY(),
        z: block.getZ()
    }
    brewingStands = brewingStands.filter(stand => !compareCoords(stand, brokenStand))
})

// get brewing time left 
register("tick", () => {
    if (!settings().brewingStandLoadedBox) return
    if (!openedStand) return

    const name = Player.getContainer()?.getStackInSlot(22)?.getName()
    if (name) {
        const match = name.match(timeRegex)
        if (match) openedStand.brewingEnd = Date.now() + parseFloat(match[1]) * 1000
        else openedStand.brewingEnd = null
    }
    else openedStand.brewingEnd = null

    const index = brewingStands.findIndex(stand => compareCoords(stand, openedStand))
    if (index !== -1) {
        brewingStands.splice(index, 1)
    }
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
        RenderLib.drawInnerEspBox(stand.x + 0.5, stand.y + .1, stand.z + 0.5, .8, .8,
            colour[0]/255, colour[1]/255, colour[2]/255, colour[3]/255, false)
    })
}), () => settings().brewingStandLoadedBox && brewingStands && Skyblock.area === "Private Island")

// clear opened stand when closed
onInventoryClose(() => { openedStand = null })

// reset stands when unload
const reset = () => {
    brewingStands = []
    lastStand = null
    openedStand = null
}
register("worldUnload", reset)
