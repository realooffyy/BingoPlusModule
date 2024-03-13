import settings from "../settings"

const regex = /New day! Your Sky Mall buff changed!|You can disable this messaging by toggling Sky Mall in your \/hotm!|New buff: [Gain|Reduce|Increase|10x].*/g

register("chat", (e) => {
    if(!settings.block_sky_mall_messages) return
    cancel(e)
}).setCriteria(regex)

// https://regex101.com/r/c0poYe/1