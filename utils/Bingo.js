import settings from "../settings"
import Skyblock from "./Skyblock"
import Window from "./Window"
import { data } from "./constants"
import { getScoreboard } from "./utils"
// import { getScoreboard } from "./utils"

//const S30PacketWindowItems = Java.type("net.minecraft.network.play.server.S30PacketWindowItems")
//const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")
//const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")


const goalSlots = [2,  3,  4,  5,  6,
                   11, 12, 13, 14, 15,
                   20, 21, 22, 23, 24,
                   29, 30, 31, 32, 33,
                   38, 39, 40, 41, 42]
const communityGoalSlots = [0, 6, 12, 18, 24]

const contributionRegex = /§5§o§7Contribution: (.*)/
const percentRegex = /  §8Top §(\w)(.*)%/
const rankRegex = /  §6§l#(\d{1,3}) §fcontributor/

export default new class Bingo {
    constructor() {
        this.inBingo = null

        this.goals = null
        this.community = null

        this.cardOpened = false

        register("tick", (t) => { // bingo check
            this.inBingo = getScoreboard().some(line => line.includes('Ⓑ'))
            this.cardOpened = Window.getTitle() === "Bingo Card" ||
                             (Window.getTitle() === "Your Skills" && data.dev) // also skills menu for testing
        })

        register("tick", (t) => {
            if (t%5) return
            if (!Skyblock.inSkyblock) return
            if (!this.cardOpened) return

            const inv = Player.getContainer()

            if ((!settings().communityGoalDisplay && !settings().bingoCardDisplay) || inv == null) return

            // extract goals
            const goals = goalSlots.map(slot => inv.getItems()[slot])

            if (goals.includes(null)) this.goals = null
            else if (goals.some(goal => goal.getName() == "§cClose")) this.goals = null // fix for /showing the bingo card
            else this.goals = goals

            // extract community goals
            if (this.goals)
                this.community = this.extractCommunity(communityGoalSlots.map(slot => this.goals[slot]))
            else
                this.community = null

        })
            
        register("worldLoad", () => this.reset())
    }

    /**
     * uses the api to check if the bingo event is ongoing
     * @returns if the bingo event is underway
     */
    isOngoing() {
        const time = Date.now()
        return data.bingoApi.start != null && data.bingoApi.end != null &&
               (data.bingoApi.start < time && time < data.bingoApi.end)
    }

    extractCommunity(list) {
        goals = []
        list.forEach(item => {
            const goal = {
                name: null,
                tier: null,
                contributionLine: '&cNo contribution!',
                percent: null,
                percentColour: null,
                rank: null,
                rankLine: null,
            }

            goal.name = item.getName()
            
            item.getLore().forEach(line => {
                if (contributionRegex.test(line)) {
                    goal.contributionLine = contributionRegex.exec(line)[1]
                } else if (percentRegex.test(line)) {
                    [, goal.percentColour, goal.percent] = percentRegex.exec(line)
                } else if (rankRegex.test(line)) {
                    goal.rank = rankRegex.exec(line)[1]
                }
            })
            
            goals.push(goal)
        })
        return goals
    }
    
    reset() {
        this.inBingo = null
        this.ongoingEvent = false
    }
}