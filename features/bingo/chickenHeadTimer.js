/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import settings from "../../settings"
import Skyblock from "../../../BloomCore/Skyblock"
import { registerWhen } from "../../../BloomCore/utils/Utils"

let hasChickenHead = false
let lastLay = 0

register("tick", (tick) => {
    if (!settings.chicken_head_timer || !Skyblock.inSkyblock) return hasChickenHead = null
    if (!tick%10==0) return
    const helmet = Player.armor.getHelmet().getName()
    hasChickenHead = helmet.includes("Chicken Head")
})

register("worldLoad", () => {
    lastLay = new Date().getTime()
})

registerWhen(register("renderOverlay", () => {
    if (!hasChickenHead) return

    Renderer.translate(data.chickenHeadTimerDisplay.x, data.chickenHeadTimerDisplay.y)
    Renderer.scale(data.chickenHeadTimerDisplay.scale ?? 1)

    const sinceLay = new Date().getTime() - lastLay
    const layCooldown = 5000
    const remainingTime = layCooldown - sinceLay

    let output
    if (remainingTime<0) output = "Chicken Head Timer: §aNow"
    else output = `Chicken Head Timer: §b${Math.floor(remainingTime,1000)}`
    
    Renderer.drawStringWithShadow(output)

}), () => hasChickenHead)

register("dragged", (dx, dy, x, y) => {
    if (!Config.chickenHeadTimerMove.isOpen()) return
    data.chickenHeadTimerDisplay.x = x
    data.chickenHeadTimerDisplay.y = y
    data.save()
})