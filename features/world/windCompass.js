import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import { drawCenteredText, getStringWidth } from "../../render/utils"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { getScoreboard, registerWhen } from "../../utils/utils"

const allowedLocations = ['Dwarven Mines', 'Crystal Hollows']
const windRegex = /^.*[⋗⋖≈].*$/

const displayExampleString = '&l⋖&r  &a≈   &2≈   &a≈&r  &l⋗'

let windy = false
let windText = ''

let displayWidth = 100

let opened = false

let windCompassDisplayGui = new BaseGui('windCompassDisplay', ['windCompassDisplay', 'windCompass', 'wind'])
registerGui(windCompassDisplayGui)

register("tick", (t) => {
    if (t%5) return
    opened = (Skyblock.inSkyblock && allowedLocations.includes(Skyblock.area) && (settings().windCompassDisplay || settings().windCompassGuide))
    windy = false
    if (!opened) return

    const scoreboard = getScoreboard(true)
    scoreboard.forEach(x => {
        if (windRegex.test(x)) {
            windy = true
            windText = x
            return
        }
    })
    displayWidth = getStringWidth(String(windText))
})

registerWhen(register("renderOverlay", () => {
    drawCenteredText(windText, 'windCompassDisplay', displayWidth)
}), () => settings().windCompassDisplay && windy && !windCompassDisplayGui.isOpen())

registerWhen(register("renderOverlay", () => {
    drawCenteredText(displayExampleString, 'windCompassDisplay', getStringWidth(displayExampleString))
}), () => windCompassDisplayGui.isOpen())

// The wind has changed direction!