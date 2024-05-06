import Settings from "../../settings"
import constants from "../../utils/constants"
import Bingo from "../../utils/Bingo";

const regex = /(  HEART OF THE MOUNTAIN TIER .*|BINGO GOAL COMPLETE!.*|You completed all 20 goals for the .* Bingo Event!|Your Bingo leveled up to level 100!)/g 
// https://regex101.com/r/95tENg/1

register("chat", (event) => {
    if (!Settings.copyAchievements || !Bingo.enabled) return
    ChatLib.command(`ct copy ${event}`, true)
    ChatLib.chat(constants.PREFIX+"&aAchievement copied to clipboard!");
}).setCriteria(regex);