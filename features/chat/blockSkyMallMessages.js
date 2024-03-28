import Skyblock from "../../utils/Skyblock"
import Settings from "../../settings"

const areas = ['Dwarven Mines', 'Crystal Hollows']
const regex = /New day! Your Sky Mall buff changed!|You can disable this messaging by toggling Sky Mall in your \/hotm!|New buff: [Gain|Reduce|Increase|10x].*/g

register("chat", (e) => {
    if (!Settings.blockSkyMallMessages) return
    if (areas.includes(Skyblock.area)) return
    cancel(e)
}).setCriteria(regex)

// https://regex101.com/r/c0poYe/1
