import Settings from "../settings"
import constants from "../utils/constants"

register("command", () => {
    Settings.ratHelper = !Settings.ratHelper
    ChatLib.chat(`${constants.PREFIX}${Settings.ratHelper ? '&aEnabled' : '&cDisabled'} Rat Helper.`)
}).setName("rats").setAliases(["rathelper"])