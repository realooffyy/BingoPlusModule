import Settings from "../../Settings"
import constants from "../../utils/constants"
import Bingo from "../../utils/Bingo";
import Party from "../../utils/Party";

const regex = /(  HEART OF THE MOUNTAIN TIER .*|BINGO GOAL COMPLETE!.*|You completed all 20 goals for the .* Bingo Event!|Your Bingo leveled up to level 100!)/g 
// https://regex101.com/r/95tENg/1

register("chat", (event) => {
    if (!Bingo.inBingo) return
    if (Settings.copyAchievements) {
        ChatLib.command(`ct copy ${event}`, true)
        ChatLib.chat(`${constants.PREFIX}&aAchievement copied to clipboard!`)
    }
    if (Settings.autoSendAchievementsInParty) {
        if (Party.inParty) ChatLib.say(`/pc ${event}`)
    }
    if (Settings.autoSendAchievementsInGuild) ChatLib.say(`/gc ${event}`)

}).setCriteria(regex)