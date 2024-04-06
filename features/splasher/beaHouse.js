import Settings from "../../settings"


register("renderScoreboard", (e) => {
    if (!Settings.showBeaHouseInScoreboard) return
    lines = Scoreboard.getLines()
    for (let i = 0; i<lines.length; i++) {
        if (lines[i].includes('Pet Care')) Scoreboard.setLine(i, lines[i].replace('Pet Care', 'Bea House'))
    }
})