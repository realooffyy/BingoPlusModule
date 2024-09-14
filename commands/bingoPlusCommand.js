// TODO: make sub-commands modular

import guis from "../render/registerGui"
import settings from "../settings"
import { data } from "../utils/constants"
import constants from "../utils/constants"
import { streamCommands } from "../features/party/customStreamCommands"
import { addToChatBox } from "../utils/utils"
import Party from "../utils/Party"

const commandsList = [
    "help",
    "move",
    "copy",
    "rat",
    "stream"
]

export const bingoPlusCommand = register("command", (...args) => {
    if (!args || !args[0]) return settings().getConfig().openGui()

    args = args.map(arg => arg ? arg.toLowerCase() : arg)
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

        case "rat":
        case "rats":
        case "ratwaypoints":
            settings().getConfig().setConfigValue('Other', 'ratWaypoints', !(settings().ratWaypoints))
            ChatLib.chat(`${constants.PREFIX}${settings().ratWaypoints ? '&aEnabled' : '&cDisabled'} Rat waypoints.`)
            break

        case "stream":
            ChatLib.chat(`${constants.PREFIX}Custom /stream commands\n&cPlease note these only work with a valid Hypixel rank for hosting parties.`)
            streamCommands.forEach(cmd => {
                new TextComponent(`&a${cmd[0]}&r: ${cmd[1]}`)
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
            if (!args[1]) {
                data.dev = !data.dev
                data.save()
                ChatLib.chat(`${constants.PREFIX}Set developer to ${data.dev}`)
                if (data.dev) ChatLib.chat("Make sure you know what you're doing!")
            }
            else switch (args[1]) {
                case "simulateparty":
                    if (!args[2]) ChatLib.chat(`${constants.PREFIX}&cLeader not specified`)
                    Party.simulateParty(args[2])
                    ChatLib.chat(`${constants.PREFIX}&aSimulating a party with leader ${Party.leader}`)
                    break
                default:
                    ChatLib.chat(`${constants.PREFIX}&cCan't find this dev option`)
            }
            
            break

        default: 
            ChatLib.chat(`${constants.PREFIX}Unknown command. Run &6/b+ help&r to see all commands.`)

        // Helper functions
        case "copy":
            const text = args.slice(2).join(" ") // shift removes copy and reason
            ChatLib.command(`ct copy ${text}`, true)
            new TextComponent(`${constants.PREFIX}&aCopied ${args[1].replace(/_/g, ' ')} to clipboard!`)
                .setHoverValue(text)
                .chat()
            break
        
        case "addtochatbox":
            addToChatBox(args.slice(1).join(" "))
            break
        
    }

}).setName("b+")
  .setAliases(["bingo+","bingoplus"])
  .setTabCompletions(commandsList)


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