import request from "../../requestV2"
import settings from "../settings"
import constants, { data } from "./constants"
import { onHypixelConnect } from "./Events"

const bingoPlusModuleData = 'https://raw.githubusercontent.com/realooffyy/ModuleData/main/BingoPlusModule/data.json'

const apiError = (text, err, report = true) => {
    ChatLib.chat(`${constants.PREFIX}&7${text}: &f"${err}" ${report ? "\n"+constants.PREFIX+"&7Please report this to ooffyy &7on discord!" : ""}`)
}

const callGitHubModuleData = () => {
    request({
        url: bingoPlusModuleData,
        json: true
    })
    .then(api => {
        if (!(api.version <= data.moduleData.version)) {
            ChatLib.chat(new TextComponent(`${constants.PREFIX}&7Updating BingoPlusModule data (v${data.moduleData.version} -> v${api.version})`)
            .setClickAction('run_command')
            .setClickValue(bingoPlusModuleData))

            data.moduleData = api
            data.save()
        }
        
    })
    .catch(err => {
        apiError('Error fetching BingoPlusModule data', err, true)
        ChatLib.chat()
    })
}

const callBingoApi = () => {
    request({
        url: 'https://api.hypixel.net/v2/resources/skyblock/bingo',
        json: true
    })
    .then((api) => {
        if (data.bingoApi.id !== api.id) ChatLib.chat(`${constants.PREFIX}&7Loading data for &a${api.name} &7Bingo!`)
        if (data.bingoApi.lastUpdated !== api.lastUpdated) {
            data.bingoApi.id = api.id
            data.bingoApi.lastUpdated = api.lastUpdated
            data.bingoApi.name = api.name
            data.bingoApi.modifier = api.modifier
            data.bingoApi.start = api.start
            data.bingoApi.end = api.end

            //data.bingoApi.goals = api.goals
            //data.bingoApi.communityGoals = [api.goals[0], api.goals[6], api.goals[12], api.goals[18], api.goals[24]]
            data.save()
            
        }
    })
    .catch(err => {
        apiError("Error fetching bingo api", err.cause, true)
    })
}

let apiLoaded = false

onHypixelConnect(() => {
    apiLoaded = false
})

register("tick", () => {
    if (apiLoaded) return
    if (!World.isLoaded()) return
    apiLoaded = true

    if (settings().devBingoPlusModuleData) callGitHubModuleData()
    if (settings().devBingoApi) callBingoApi()
})

/*
let requestExpires = Date.now() + 1000 // makes sure the request only happens once

register("worldLoad", () => {
    if (Date.now() < requestExpires) return
    requestExpires = Date.now() + 1000
    callBingoApi()
    callGitHubModuleData()
})
*/