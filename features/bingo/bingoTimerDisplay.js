import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import Settings from "../../settings"
import Bingo from "../../utils/Bingo"
import { data } from "../../utils/constants"
import { registerWhen } from "../../utils/utils"

let bingoTimerDisplayGui = new BaseGui('bingoTimerDisplay', ['bingoTimerDisplay', 'bingoTimer'])
registerGui(bingoTimerDisplayGui)

let opened = false

const day = 86400000
let localDate = Date.now()
let prefix = ''
let diff = 0
let line = ''

register("tick", (t) => {
    if (t%10) return
    if (!Settings.bingoTimerDisplay || (!Bingo.inBingo && !Settings.bingoTimerDisplayEverywhere)) return
    if (bingoTimerDisplayGui.isOpen()) { line = 'Bingo Timer'; return }

    line = ''

    opened = true

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
            prefix = 'Bingo profile deletion: '
        } else if (localDate > data.bingoApi.start) { // mid-bingo
            diff = data.bingoApi.end - localDate
            prefix = 'Bingo ends: '
        } else if (localDate > (data.bingoApi.start - day*3)) { // pre-bingo
            diff = data.bingoApi.start - localDate
            prefix = 'Bingo starts: '
        } else return

        const result = msToTime(diff)

        if (Settings.bingoTimerDisplayDontRound) {
            if (result[0] > 0) line += result[0] + 'd ' + result[1] + 'h '+ result[2] + 'm ' + result[3] + 's'
            else if (result[1] > 0) line += result[1] + 'h ' + result[2] + 'm ' + result[3] + 's'
            else if (result[2] > 0) line += result[2] + 'm ' + result[3] + 's'
            else if (result[3] > 0) line += result[3] + 's'
            else line += '0s'
        } else {
            if (result[0] > 0) line += result[0] + 'd '
            else if (result[1] > 6) line += result[1] + 'h '
            else if (result[1] > 0) line += result[1] + 'h ' + result[2] + 'm '
            else if (result[2] > 0) line += result[2] + 'm ' + result[3] + 's'
            else if (result[3] > 0) line += result[3] + 's'
            else line += '0s'
        }

    }
})

registerWhen(register("renderOverlay", () => {
    Renderer.scale(data.bingoTimerDisplay.scale)
    Renderer.drawStringWithShadow(line, data.bingoTimerDisplay.x, data.bingoTimerDisplay.y)
}), () => opened)

function msToTime(s) { // adapted from https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
    let ms = s % 1000
    s = (s - ms) / 1000
    let secs = s % 60
    s = (s - secs) / 60
    let mins = s % 60
    s = (s - mins) / 60
    let hrs = s % 24
    s = (s - hrs) / 24
    let days = s
  
    return [days, hrs, mins, secs]
}