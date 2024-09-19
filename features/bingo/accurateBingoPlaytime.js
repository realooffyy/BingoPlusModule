import settings from "../../settings"
import Bingo from "../../utils/Bingo"
import constants, { data } from "../../utils/constants"
import { convertDateObjectToString, msToTime } from "../../utils/utils"

register("step", () => {
    if (!settings().accurateBingoPlaytime || !Bingo.inBingo) return
    if (data.bingoPlaytime == 0 || !data.bingoPlaytimeStart) {
        data.bingoPlaytimeStart = Date.now()
        data.bingoPlaytime = 0
    }

    data.bingoPlaytime += 1
    if (!data.bingoPlaytime % 60) data.save()
}).setDelay(1)

// TODO: show an informative message when starting playtime recording
register("chat", () => {
    data.bingoPlaytime = 0
    data.bingoPlaytimeStart = null
    data.save()
}).setCriteria('                     Welcome to SkyBlock Bingo!')

register("chat", () => {
    if (!settings().accurateBingoPlaytime || !Bingo.inBingo) return
    const time = msToTime(data.bingoPlaytime*1000)
    const startTime = new Date(data.bingoPlaytimeStart)
    const msg = new TextComponent(`${constants.PREFIX}&aPlaytime: ${time[0]}d ${time[1]}h ${time[2]}m ${time[3]}s `)
                .setHoverValue(`&7Started recording at ${convertDateObjectToString(startTime)}`)
                .chat()
}).setCriteria(/^You have .* playtime!$/)