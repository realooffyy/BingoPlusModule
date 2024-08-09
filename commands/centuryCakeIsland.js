import settings from "../settings"
import constants from "../utils/constants"

register("command", () => {
    let name = '' + settings().centuryCakeIsland
    if (name == '') {
        ChatLib.chat(`${constants.PREFIX}&aDefaulting to BingoSplasher.`)
        name = "BingoSplasher"
    }
    ChatLib.say(`/visit ${name}`)
}).setCommandName("cake").setAliases("cakes")