import RenderLib from "../../../RenderLib"
import deepEquals from "../../../DeepEquals/index"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { registerWhen } from "../../utils/utils"

// some logic from skytils
// https://github.com/Skytils/SkytilsMod/blob/1.x/src/main/kotlin/gg/skytils/skytilsmod/features/impl/misc/BrewingFeatures.kt

const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")

let lastBrewingStand = null
let brewingStands = []
// let lastServer = null
// potentially keep stands active if the server is still up, not sure if this would work though lol


// handle brewing stand interaction
register("playerInteract", (action) => {
    if (!settings().brewingStandLoadedBox) return
    if (Skyblock.area !== "Private Island") return
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    const block = Player.lookingAt()
    if (block.type.getRegistryName() !== "minecraft:brewing_stand") return
    lastBrewingStand = {
        x: block.getX() + 0.5,
        y: block.getY(),
        z: block.getZ() + 0.5
    }
})

// push the last stand if the menu is opened
register("packetReceived", (packet) => {
    if (!settings().brewingStandLoadedBox) return
    if (lastBrewingStand === null) return
    if (!packet.func_179840_c().func_150254_d().removeFormatting() === "Brewing Stand") return
    if (!brewingStands.some(stand => // i tried the deepequals module but it didn't work
        stand.x === lastBrewingStand.x &&
        stand.y === lastBrewingStand.y &&
        stand.z === lastBrewingStand.z
    )) brewingStands.push(lastBrewingStand)
    lastBrewingStand = null
}).setFilteredClass(S2DPacketOpenWindow)

// render box
registerWhen(register("renderWorld", () => {
    brewingStands.forEach(stand => {
        RenderLib.drawInnerEspBox(stand.x, stand.y + .1, stand.z, .8, .8, 0, 1, 0, .3, false)
    })
}), () => brewingStands && Skyblock.area === "Private Island")


register("worldUnload", () => { brewingStands = [] })
