import Settings from "../Settings"
import constants from "../utils/constants"

register("command", () => {
    Settings.ratWaypoints = !Settings.ratWaypoints
    ChatLib.chat(`${constants.PREFIX}${Settings.ratWaypoints ? '&aEnabled' : '&cDisabled'} Rat waypoints.`)
}).setName("rats").setAliases(["ratwaypoints"])