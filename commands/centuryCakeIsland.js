import settings from "../settings"
import constants from "../utils/constants"

register("command", () => {
    let x = ''+settings.centuryCakeIsland
    if (settings.centuryCakeIsland === '') {
        ChatLib.chat(`${constants.PREFIX}&aDefaulting to BingoSplasher.`)
        x = "BingoSplasher"
    }
    ChatLib.say(`/visit ${x}`)
}).setCommandName("cake").setAliases("cakes")