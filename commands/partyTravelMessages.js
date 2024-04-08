import Settings from "../settings"
import constants from "../utils/constants"

register("command", () => {
    Settings.blockPartyTravelMessages = !Settings.blockPartyTravelMessages
    ChatLib.chat(`${constants.PREFIX}${!Settings.blockPartyTravelMessages ? '&aShowing': '&cHiding'} Party Travel messages!`)
}).setName("partytravel").setAliases(['ptravel'])