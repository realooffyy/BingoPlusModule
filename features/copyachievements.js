import settings from "../settings"
import constants from "../utils/constants"
import { bingoCheck } from "../utils/onbingo";

const PREFIX = constants.PREFIX

register("chat", (e) => {
    if (!settings.copy_achievements || !bingoCheck()) return
    ChatLib.command("ct copy "+ChatLib.getChatMessage(e).replace(/§./g, ''), true)
    ChatLib.chat(PREFIX+"&aAchievement copied to clipboard!");
}).setCriteria("§6§lBINGO GOAL COMPLETE!").setContains();