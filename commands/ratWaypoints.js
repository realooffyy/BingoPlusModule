import settings from "../settings"
import constants from "../utils/constants"

// doc ty fix
register("command", () => {
    settings().getConfig().setConfigValue('Other', 'ratWaypoints', !(settings().ratWaypoints))
    ChatLib.chat(`${constants.PREFIX}${settings().ratWaypoints ? '&aEnabled' : '&cDisabled'} Rat waypoints.`)
}).setName("rats").setAliases(["ratwaypoints"])