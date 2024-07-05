import Settings from "../Settings"
import Skyblock from "./Skyblock"
import { data } from "./constants"

const goalSlots = [2,  3,  4,  5,  6,
                   11, 12, 13, 14, 15,
                   20, 21, 22, 23, 24,
                   29, 30, 31, 32, 33,
                   38, 39, 40, 41, 42]
const communityGoalSlots = [0, 6, 12, 18, 24]

const contributionRegex = /§5§o§7Contribution: (.*)/
const percentRegex = /  §8Top §(\w)(.*)%/
const rankRegex = /  §6§l#(\d)+ §fcontributor/

export default new class Bingo {
    constructor() {
        this.inBingo = null
        this.goals = null
        this.community = null
        this.inv = null
        this.cardOpened = false

        register("tick", (t) => { // bingo check
            if (t%10 || !Skyblock.inSkyblock) return
            const displayName = Player.getDisplayName().text
            const inv = Player.getContainer()
            this.inv = inv
            this.inBingo = displayName.includes("Ⓑ")
            this.enabled = this.inBingo || !Settings.onlyOnBingo
        })

        register("tick", (t) => { // bingo card grabber
            if (!Skyblock.inSkyblock) return
            if ((!Settings.communityGoalDisplay && !Settings.bingoCardDisplay) || this.inv == null) return
            if (this.inv.getName() == "Bingo Card" || (this.inv.getName() == "Your Skills" && data.dev)) { // also skills menu for testing purposes
                this.cardOpened = true

                if (t%10) return

                const goals = goalSlots.map(slot => this.inv.getItems()[slot])
                if (goals.includes(null)) this.goals = null
                else this.goals = goals

                if (this.goals) this.community = this.extractCommunity(communityGoalSlots.map(slot => this.goals[slot]))
                else this.community = null
                
                return
            }
            this.cardOpened = false
        })
            
        register("worldLoad", () => this.reset())
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
                    goal.rank = rankRegex.exec(line)
                }
            })
            
            goals.push(goal)
        })
        return goals
    }
    reset() {
        this.inBingo = null
        this.enabled = null
        this.cardOpened = false
    }


}