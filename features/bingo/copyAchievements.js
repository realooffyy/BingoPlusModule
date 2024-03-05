import settings from "../../settings"
import constants from "../../utils/constants"
import { bingoFeaturesEnabled } from "../../utils/bingoCheck";

const regex = /(HEART OF THE MOUNTAIN.*|BINGO GOAL COMPLETE!.*)/g // https://regex101.com/r/nHf4KU/1

register("chat", (e) => {
    if (!settings.copy_achievements || !bingoFeaturesEnabled()) return
    ChatLib.command("ct copy "+ChatLib.getChatMessage(e).replace(/§./g, ''), true)
    ChatLib.chat(constants.PREFIX+"&aAchievement copied to clipboard!");
}).setCriteria(regex).setContains();