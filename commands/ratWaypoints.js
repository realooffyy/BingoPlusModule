import settings from "../settings"
import constants from "../utils/constants"

// todo: fix this

register("command", () => {
    const active = !(settings().ratWaypoints)
    settings().getConfig().setConfigValue('Other', 'ratWaypoints', active)
    ChatLib.chat(`${constants.PREFIX}${active ? '&aEnabled' : '&cDisabled'} Rat waypoints.`)
}).setName("rats").setAliases(["ratwaypoints"])