import settings from "../settings"
import Party from "../utils/Party"

const commandName = settings().bingoPartyAlias
const commandList = [ 
    'mute', 'unmute',
    'promote', 'pro', 'prom', 'promo',
    'kickoffline', 'kickafk', 'ko', 'ka',
    'kick', 'remove',
    'ban', 'block',
    'unban', 'unblock',
    'stream', 'public', 'open',
    'invite', 'inv',
    'allinvite',
    'say', 'speak',
    'repeat', 'rep',
    'customrep', 'customrepeat', 'crep', 'crepeat',
    'rule',
    'guide',
    'poll',
    'help',
    // leave the worst for last
    'transfer',
    'disband'
]
// https://github.com/aphased/BingoPartyCommands

if (commandName !== '') {
    register("command", (...args) => {
        let message = args.join(" ")
        if (settings().bingoPartyCommandRandomString) message = Party.addRandomString(message)
        ChatLib.command(`msg ${Party.getBotIGN()} !p ${message}`)
    })
    .setTabCompletions((args) => {
        if (args == undefined || args[0] == undefined) return commandList

        else {
            let output = []
            commandList.forEach(x => {
                if (x.startsWith(args[0].toLowerCase())) output.push(x)
            })
            return output
        }
    })
    
    .setName(commandName)
}