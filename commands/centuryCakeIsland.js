import Settings from "../Settings"
import constants from "../utils/constants"

register("command", () => {
    let name = '' + Settings.centuryCakeIsland
    if (Settings.centuryCakeIsland === '') {
        ChatLib.chat(`${constants.PREFIX}&aDefaulting to BingoSplasher.`)
        name = "BingoSplasher"
    }
    ChatLib.say(`/visit ${name}`)
}).setCommandName("cake").setAliases("cakes")