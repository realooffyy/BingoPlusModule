import Settings from "../settings"

const regex = /Finished parkour .* in .*!|Started parkour .*!|\+5 Island Points/g
// https://regex101.com/r/hgctQ9/1

register("chat", (e) => {
    if (!Settings.block_parkour_messages) return
    cancel(e)
}).setCriteria(regex)