import { BaseGui } from "../../render/BaseGui"
import { data } from "../../utils/constants"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { getSkyblockItemID, registerWhen } from "../../utils/utils"
import { registerGui } from "../../render/registerGui"

const layCooldown = 5000
let lastLay = 0
let opened = false

let chickenHeadTimerGui = new BaseGui('chickenHeadTimerDisplay', ['chickenHeadTimerDisplay', 'chickenHead', 'chicken'])
registerGui(chickenHeadTimerGui)

register("tick", () => {
    opened = (settings().chickenHeadTimer && Skyblock.inSkyblock && getSkyblockItemID(Player.armor?.getHelmet()) === "CHICKEN_HEAD") || chickenHeadTimerGui.isOpen()
})

register("worldLoad", () => {
    lastLay = new Date().getTime()
})

registerWhen(register("renderOverlay", () => { // thanks bloom
    Renderer.translate(data.chickenHeadTimerDisplay.x, data.chickenHeadTimerDisplay.y)
    Renderer.scale(data.chickenHeadTimerDisplay.scale ?? 1)

    // Move GUI
    if (chickenHeadTimerGui.isOpen()) return Renderer.drawStringWithShadow("Chicken Head Timer:", 0, 0)
    
    let sinceLay = new Date().getTime() - lastLay
    let remainingTime = layCooldown - sinceLay

    let output
    if (remainingTime<0) output = "Chicken Head Timer: §aNow"
    else output = `Chicken Head Timer: §b${Math.ceil(remainingTime/1000)}s`
    
    Renderer.drawStringWithShadow(output, 0, 0)

}), () => opened)

register("chat", (e) => {
    lastLay = new Date().getTime()
    if (settings().hideEggLaidMessage) cancel(e)
}).setCriteria("You laid an egg!")