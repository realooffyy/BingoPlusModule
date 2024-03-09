import settings from "../settings"
import constants from "../utils/constants"

register("command", () => {
    let x = ''+settings.century_cake_island
    if (settings.century_cake_island == '') {
        ChatLib.chat(`${constants.PREFIX}&cNothing in settings bozo! &aDefaulting to BingoSplasher.`)
        x = "BingoSplasher"
    }
    ChatLib.say(`/visit ${x}`)
}).setCommandName("cake").setAliases("cakes")