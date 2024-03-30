import request from "../../requestV2"
import constants, { data } from "./constants"

x = data.bingoApi
const prefix = constants.PREFIX

callBingoApi()  

register("step", () => {
    if (!data.bingoApiOn) return
    callBingoApi()    
}).setDelay(120)

function callBingoApi() {
    request({
        url: 'https://api.hypixel.net/v2/resources/skyblock/bingo',
        json: true
    })
    .then((api) => {
        if (x.id !== api.id) {
            x.id = api.id
            x.lastUpdated = api.lastUpdated
            x.name = api.name
            x.modifier = api.modifier
            x.start = api.start
            x.end = api.end
            data.save()
            ChatLib.chat(`${prefix}&7Loaded data for &a${x.name} &7Bingo!`)
        }
    })
    .catch(err => {
        ChatLib.chat(`${prefix}&7Failed to get Bingo data. (${err})`)
    })
}