import Settings from "../settings"
import { data } from "../utils/constants"
import constants from "../utils/constants"


export const bingoPlusCommand = register("command", (...args) => {
    if (!args || !args[0]) return Settings.openGUI()

    if (args[0] == "help") {
        let line = `&6&m${ChatLib.getChatBreak(" ")}`
        let cmd = ''
        constants.COMMANDS_LIST.forEach(x => {cmd += x+'\n'})
        ChatLib.chat([line, constants.PREFIX, "", cmd, line].join("\n"))
    }

    else if (args[0] == "togglebingoapi") {
        data.bingoApiOn = !data.bingoApiOn
        data.save()
        ChatLib.chat(`${constants.PREFIX}Set bingo api calling to ${data.bingoApiOn}`)
    }

    else {
        ChatLib.chat(`${constants.PREFIX}Unknown command. Run &6/b+ help&r to see all commands.`)
    }

}).setName("b+").setAliases(["bingo+","bingoplus"])