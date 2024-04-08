import Settings from "../../settings"
import Bingo from "../../utils/Bingo"
import constants from "../../utils/constants"

const msg = new TextComponent(`&9Party &8> &fTravel messages are ${!Settings.blockPartyTravelMessages ? '&ashown': '&chidden'}&r.`)
            .setClick("run_command", "/partytravel")

register("chat", (e) => {
    if(!Settings.blockPartyTravelMessages) return
    cancel(e)
}).setCriteria(/ &9&l».*/g)

register("chat", () => {
    if (!Settings.blockPartyTravelMessagesWarning) return
    ChatLib.chat(msg)
}).setCriteria(/&eYou have joined .* &r&eparty!&r/)
