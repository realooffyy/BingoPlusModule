import request from "../../requestV2"
import constants, { data } from "./constants"

x = data.bingoApi
const prefix = constants.PREFIX

request({
    url: 'https://api.hypixel.net/v2/resources/skyblock/bingo',
    json: true
})
.then((api) => {
    if (api.id !== x.id) {
        x.id = api.id
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


