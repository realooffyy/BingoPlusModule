//import settings from "../settings"
import constants from "../utils/constants"

const PREFIX = constants.PREFIX

// Bestiary unlocked

register("chat", (e) => {
    ChatLib.chat(PREFIX+"&aBestiary unlocked!");
}).setCriteria("[NPC] Bramass Beastslayer: You can find the Bestiary in your Combat Skill menu!");