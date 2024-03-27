import Settings from "../../settings"
import Bingo from "../../utils/Bingo"

register("chat", (e) => {
    if(!Settings.blockPartyTravelMessages || !Bingo.enabled) return
    cancel(e)
}).setCriteria(/ &9&l».*/g)