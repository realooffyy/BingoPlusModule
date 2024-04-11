import request from "../../requestV2"
import constants, { data } from "./constants"

x = data.bingoApi
const prefix = constants.PREFIX

callBingoApi()  

register("step", () => {
    callBingoApi()    
}).setDelay(300)

function callBingoApi() {
    request({
        url: 'https://api.hypixel.net/v2/resources/skyblock/bingo',
        json: true
    })
    .then((api) => {
        if (x.id !== api.id) ChatLib.chat(`${prefix}&7Loading data for &a${x.name} &7Bingo!`)
        if (x.lastUpdated !== api.lastUpdated) {
            x.id = api.id
            x.lastUpdated = api.lastUpdated
            x.name = api.name
            x.modifier = api.modifier
            x.start = api.start
            x.end = api.end

            x.goals = api.goals
            x.communityGoals = [api.goals[0], api.goals[6], api.goals[12], api.goals[18], api.goals[24]]
            data.save()
            
        }
    })
    .catch(err => {
        ChatLib.chat(`${prefix}&7Failed to get Bingo data. (${err})`)
    })
}