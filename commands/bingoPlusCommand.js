import guis from "../render/registerGui"
import settings from "../settings"
import { data } from "../utils/constants"
import constants from "../utils/constants"
import { streamCommands } from "../features/party/customStreamCommands"

const commandsList = [
    "help",
    "move",
    "togglebingoapi",
    "resetdata"
]

export const bingoPlusCommand = register("command", (...args) => {
    if (!args || !args[0]) return settings().getConfig().openGui()
    
    switch (args[0]) {
        case "help":
            let line = `&6&m${ChatLib.getChatBreak(" ")}`
            let cmd = ''
            constants.COMMANDS_LIST.forEach(x => {cmd += x+'\n'})
            ChatLib.chat([line, constants.PREFIX, "", cmd, line].join("\n"))
            break

        case "move": // thanks coleweight
            if (args[1] == undefined) {ChatLib.chat(`${constants.PREFIX}&cNot enough arguments.`); return}
            let found = false

            guis.forEach(gui => {
                if(gui.aliases.map(alias => alias.toLowerCase()).includes(args[1].toLowerCase())) {
                    gui.open()
                    found = true
                }
            })

            if (!found) ChatLib.chat(`${constants.PREFIX}&cNo such gui as '${args[1]}'.`)

            break

        case "stream":
            ChatLib.chat(`${constants.PREFIX}Custom /stream commands\n&cPlease note these only work with a valid Hypixel rank for hosting parties.`)
            streamCommands.forEach(cmd => {
                let message = new TextComponent(`&a${cmd[0]}&r: ${cmd[1]}`)
                    .setClickAction("run_command")
                    .setClickValue(cmd[0])
                    .chat()
            })
            if (settings().partyCustomStreamCommands) ChatLib.chat("\n&aThese commands are active!")
            break
        
        /*
        else if (args[0] == "togglebingoapi") {
            data.bingoApiOn = !data.bingoApiOn
            data.save()
            ChatLib.chat(`${constants.PREFIX}Set bingo api calling to ${data.bingoApiOn}`)
            if (!data.bingoApiOn) ChatLib.chat(`This may break some features!`)
        }
        */

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

        case "dev":
            data.dev = !data.dev
            data.save()
            ChatLib.chat(`${constants.PREFIX}Set developer to ${data.dev}`)
            if (data.dev) ChatLib.chat("Make sure you know what you're doing!")
            break

        default: 
            ChatLib.chat(`${constants.PREFIX}Unknown command. Run &6/b+ help&r to see all commands.`)
    }

}).setName("b+")
  .setAliases(["bingo+","bingoplus"])
  .setTabCompletions([
    "help",
    "move",
    "dev"
  ])


/*
.setTabCompletions((args) => {
    if (args == undefined || args[0] == undefined) return commandsList

    else {
        if (args[0] === 'move') {
            let output = []
            guis.forEach(gui => {
                gui.aliases.forEach(alias => {
                    if (alias.startsWith(args[1].toLowerCase())) output.push(alias)
                })
            })
            return output
        }
    }
})
*/