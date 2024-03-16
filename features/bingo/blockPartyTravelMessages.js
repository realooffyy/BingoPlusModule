import settings from "../../settings"
import Bingo from "../../utils/Bingo"

register("chat", (e) => {
    if(!settings.block_party_travel_messages || !Bingo.enabled) return
    cancel(e)
}).setCriteria(/ &9&l».*/g)