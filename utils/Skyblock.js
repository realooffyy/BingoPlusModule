// thanks bloom

import { getMatchFromLines, getScoreboard, getTabList, getValue, removeUnicode } from "./utils"

const sbTitles = [
    "skyblock",
    "skiblock" // For april fools
]

export default new class Skyblock {
    constructor() {
        this.joined = null // The last time the player entered Skyblock.
        this.inSkyblock = false
        this.reset()

        register("tick", (t) => {
            if (t%10) return
            let scoreboard = getScoreboard(false)
            let tabList = getTabList(false)

            this.inSkyblock = sbTitles.some(a => Scoreboard.getTitle().removeFormatting().toLowerCase().includes(a))
            if (!this.inSkyblock) return

            for (let line of tabList) {
                this.area = getValue(line, /Area: (.+)/, this.area)
            }

            this.subArea = removeUnicode(getMatchFromLines(/ ⏣ (.+)/, scoreboard)).replace(/ \(.+\)/, "")
            if (!this.area && this.subArea == "The Catacombs") this.area = "Dungeon"

            this.server = removeUnicode(getMatchFromLines(/ Server: (.+)/, tabList)).replace(/ \(.+\)/, "") // https://regex101.com/r/cITZLV/1
                       || removeUnicode(getMatchFromLines(/\d+\/\d+\/\d+ (.+)/, scoreboard)).replace(/ \(.+\)/, "") // https://regex101.com/r/1sr2O1/1
                       || null

            if (this.server) {
                this.serverType = (this.server.slice(0,4) === 'mega' || this.server[0] === 'M' ? 'M' : 'm')
            }
            
        })

        register("chat", (message) => {
            message = ChatLib.removeFormatting(message)
            if (message == "Welcome to Hypixel SkyBlock!") this.joined = Date.now()
        }).setCriteria("${message}")

        register("worldLoad", () => this.reset())
    }
    reset() {
        this.area = null
        this.subArea = null
        this.server = null
        this.serverType = null
    }
}
