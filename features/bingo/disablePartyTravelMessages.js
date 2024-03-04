import settings from "../../settings"
import constants from "../../utils/constants"
import { bingoCheck } from "../../utils/onbingo"

register("chat", (e) => {
    if(!settings.disable_party_travel_messages || !bingoCheck()) return
    //ChatLib.chat(constants.PREFIX+ChatLib.getChatMessage(e))
    cancel(e)
}).setCriteria(/ &9&l».*/g)