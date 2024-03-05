import settings from "../../settings"
import { bingoFeaturesEnabled } from "../../utils/bingoCheck"

register("chat", (e) => {
    if(!settings.block_party_travel_messages || !bingoFeaturesEnabled()) return
    cancel(e)
}).setCriteria(/ &9&l».*/g)