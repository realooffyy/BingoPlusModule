import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import Settings from "../../Settings"
import Bingo from "../../utils/Bingo"
import Skyblock from "../../utils/Skyblock"
import { data } from "../../utils/constants"
import { registerWhen } from "../../utils/utils"
import { msToTime } from "../../utils/utils"

let bingoTimerDisplayGui = new BaseGui('bingoTimerDisplay', ['bingoTimerDisplay', 'bingoTimer'])
registerGui(bingoTimerDisplayGui)

let opened = false

const day = 86400000
let localDate = Date.now()
let diff = 0
let line = ''

register("tick", (t) => {
    opened = false
    if (!Skyblock.inSkyblock) return
    if (bingoTimerDisplayGui.isOpen()) { line = 'Bingo Timer'; return }
    if (!Settings.bingoTimerDisplay || (!Bingo.inBingo && !Settings.bingoTimerDisplayEverywhere)) return
    opened = true

    line = ''

    if (data.bingoApi.start == null || data.bingoApi.end == null) {
        line = 'Invalid API'
        return
    }

    localDate = Date.now()
    if (localDate > data.bingoApi.end + day*3) { // past profile deletion
        opened = false
        return
    } else {
        if (localDate > data.bingoApi.end) { // bingo ended
            diff = (data.bingoApi.end + day*3) - localDate
            line = '&6Bingo profile deletion: '
        } else if (localDate > data.bingoApi.start) { // mid-bingo
            diff = data.bingoApi.end - localDate
            line = '&6Bingo ends: '
        } else if (localDate > (data.bingoApi.start - day*3)) { // pre-bingo
            diff = data.bingoApi.start - localDate
            line = '&6Bingo starts: '
        } else return

        const result = msToTime(diff)

        if (Settings.bingoTimerDisplayDontRound) {
            if (result[0] > 0) line += result[0] + 'd ' + result[1] + 'h '+ result[2] + 'm ' + result[3] + 's'
            else if (result[1] > 0) line += result[1] + 'h ' + result[2] + 'm ' + result[3] + 's'
            else if (result[2] > 0) line += result[2] + 'm ' + result[3] + 's'
            else if (result[3] > 0) line += result[3] + 's'
            else line += '&aNow!'
        } else {
            if (result[0] > 0) line += result[0] + 'd '
            else if (result[1] > 6) line += result[1] + 'h '
            else if (result[1] > 0) line += result[1] + 'h ' + result[2] + 'm '
            else if (result[2] > 0) line += result[2] + 'm ' + result[3] + 's'
            else if (result[3] > 0) line += result[3] + 's'
            else line += '&aNow!'
        }
    }
})

registerWhen(register("renderOverlay", () => {
    Renderer.scale(data.bingoTimerDisplay.scale)
    Renderer.drawStringWithShadow(line, data.bingoTimerDisplay.x, data.bingoTimerDisplay.y)
}), () => opened || bingoTimerDisplayGui.isOpen())