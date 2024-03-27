import Settings from "../settings"

const regex = /Finished parkour .* in .*!|Started parkour .*!|\+5 Island Points/g
// https://regex101.com/r/hgctQ9/1

register("chat", (e) => {
    if (!Settings.blockParkourMessages) return
    cancel(e)
}).setCriteria(regex)