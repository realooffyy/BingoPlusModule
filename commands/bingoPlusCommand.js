import guis from "../render/registerGui"
import Settings from "../Settings"
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

    else if (args[0] == "move") { // thanks coleweight
        if (args[1] == undefined) {ChatLib.chat(`${constants.PREFIX}&cNot enough arguments.`); return}
        let found = false

        guis.forEach(gui => {
            if(gui.aliases.map(alias => alias.toLowerCase()).includes(args[1].toLowerCase())) {
                gui.open()
                found = true
            }
        })

        if(!found)
            ChatLib.chat(`${constants.PREFIX}&cNo such gui as '${args[1]}'.`)
    }

    else if (args[0] == "togglebingoapi") {
        data.bingoApiOn = !data.bingoApiOn
        data.save()
        ChatLib.chat(`${constants.PREFIX}Set bingo api calling to ${data.bingoApiOn}`)
        if (!data.bingoApiOn) ChatLib.chat(`This may break some features!`)
    }

    // i couldn't get this to work
    /*
    else if (args[0] == "resetdata") {
        FileLib.delete("../data/config.toml")
        FileLib.delete("../data/data.json")
        FileLib.delete("../config/config.toml")
        FileLib.delete("../config/data.json")
        ChatLib.chat(`${constants.PREFIX}Erased all data. Reloading CT!`)
        ChatLib.command('ct load', true)
    }
    */

    else if (args[0] == "dev") {
        data.dev = !data.dev
        data.save()
        ChatLib.chat(`${constants.PREFIX}Set developer to ${data.dev}`)
        if (data.dev) ChatLib.chat("Make sure you know what you're doing!")
    }

    else {
        ChatLib.chat(`${constants.PREFIX}Unknown command. Run &6/b+ help&r to see all commands.`)
    }

}).setName("b+")
  .setAliases(["bingo+","bingoplus"])
  .setTabCompletions([
    "help",
    "move",
    "togglebingoapi",
    "resetdata"
  ])