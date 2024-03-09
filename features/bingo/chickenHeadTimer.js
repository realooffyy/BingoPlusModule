import { data } from "../../utils/constants"
import settings from "../../settings"
import Skyblock from "../../../BloomCore/Skyblock"
import { registerWhen } from "../../utils/utils"

const layCooldown = 5000
let lastLay = 0
let opened = false

register("step", () => {
    if (!settings.chicken_head_timer || !Skyblock.inSkyblock) return opened = false
    if (settings.chickenHeadTimerMove.isOpen()) return opened = true
    let helmet = Player.armor.getHelmet()
    if (helmet==null) return opened = false
    if (helmet.getName().includes("Chicken Head")) return opened = true
    return opened = false
}).setFps(2)

register("worldLoad", () => {
    lastLay = new Date().getTime()
})

registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!opened) return
    
    Renderer.translate(data.chickenHeadTimerDisplay.x, data.chickenHeadTimerDisplay.y)
    Renderer.scale(data.chickenHeadTimerDisplay.scale ?? 1)

    // Move GUI
    if (settings.chickenHeadTimerMove.isOpen()) { Renderer.drawStringWithShadow("Chicken Head Timer:", 0, 0); return }
    
    let sinceLay = new Date().getTime() - lastLay
    let remainingTime = layCooldown - sinceLay

    let output
    if (remainingTime<0) output = "Chicken Head Timer: §aNow"
    else output = `Chicken Head Timer: §b${Math.ceil(remainingTime/1000)}s`
    
    Renderer.drawStringWithShadow(output, 0, 0)

}), () => opened)

register("dragged", (dx, dy, x, y) => {
    if (!settings.chickenHeadTimerMove.isOpen()) return
    data.chickenHeadTimerDisplay.x = x
    data.chickenHeadTimerDisplay.y = y
    data.save()
})

register("chat", (e) => {
    lastLay = new Date().getTime()
    if (settings.hide_egg_laid_message) cancel(e)
}).setCriteria("You laid an egg!")