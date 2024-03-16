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

        register("tick", (ticks) => {
            if (ticks%10) return
            let scoreboard = getScoreboard(false)
            let tabList = getTabList(false)

            this.inSkyblock = sbTitles.some(a => Scoreboard.getTitle().removeFormatting().toLowerCase().includes(a))
            if (!this.inSkyblock) return

            for (let line of tabList) {
                this.area = getValue(line, /Area: (.+)/, this.area)
            }
            this.subArea = removeUnicode(getMatchFromLines(/ ⏣ (.+)/, scoreboard)).replace(/ \(.+\)/, "")
            if (!this.area && this.subArea == "The Catacombs") this.area = "Dungeon"
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
    }
}