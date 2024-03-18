import Skyblock from "../../utils/skyblock"
import settings from "../settings"

const areas = ['Dwarven Mines', 'Crystal Hollows']
const regex = /New day! Your Sky Mall buff changed!|You can disable this messaging by toggling Sky Mall in your \/hotm!|New buff: [Gain|Reduce|Increase|10x].*/g

register("chat", (e) => {
    if (!settings.block_sky_mall_messages) return
    if (!areas.includes(Skyblock.area)) return
    cancel(e)
}).setCriteria(regex)

// https://regex101.com/r/c0poYe/1
