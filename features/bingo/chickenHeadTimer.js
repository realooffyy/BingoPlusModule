import { BaseGui } from "../../render/BaseGui"
import { data } from "../../utils/constants"
import Settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { registerWhen } from "../../utils/utils"
import { registerGui } from "../../render/registerGui"

const layCooldown = 5000
let lastLay = 0
let opened = false

let chickenHeadTimerGui = new BaseGui('chickenHeadTimer', ['chicken'])
registerGui(chickenHeadTimerGui)

register("tick", () => {
    opened = (Settings.chickenHeadTimer && Skyblock.inSkyblock && Player.armor?.getHelmet()?.getName()?.includes("Chicken Head")) || chickenHeadTimerGui.isOpen()
})

register("worldLoad", () => {
    lastLay = new Date().getTime()
})

registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!opened) return
    
    Renderer.translate(data.chickenHeadTimerDisplay.x, data.chickenHeadTimerDisplay.y)
    Renderer.scale(data.chickenHeadTimerDisplay.scale ?? 1)

    // Move GUI
    if (Settings.chickenHeadTimerMove.isOpen()) { Renderer.drawStringWithShadow("Chicken Head Timer:", 0, 0); return }
    
    let sinceLay = new Date().getTime() - lastLay
    let remainingTime = layCooldown - sinceLay

    let output
    if (remainingTime<0) output = "Chicken Head Timer: §aNow"
    else output = `Chicken Head Timer: §b${Math.ceil(remainingTime/1000)}s`
    
    Renderer.drawStringWithShadow(output, 0, 0)

}), () => opened)

register("chat", (e) => {
    lastLay = new Date().getTime()
    if (Settings.hideEggLaidMessage) cancel(e)
}).setCriteria("You laid an egg!")