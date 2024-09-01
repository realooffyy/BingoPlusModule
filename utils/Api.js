import request from "../../requestV2"
import constants, { data } from "./constants"

const bingoPlusModuleData = 'https://raw.githubusercontent.com/realooffyy/ModuleData/main/BingoPlusModule/data.json'


const apiError = (text, err) => {
    ChatLib.chat(`${constants.PREFIX}&7${text}: &f"${err}"\n${constants.PREFIX}&7please report this to ooffyy on discord`)
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
        apiError('Error fetching BingoPlusModule data', err)
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
        apiError("Error fetching bingo api", err.cause)
    })
}


callGitHubModuleData()

register("worldLoad", callBingoApi)