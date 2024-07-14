import Settings from "../Settings"

const commandName = Settings.bingoPartyAlias
const commandList = [ 
    'boopme',
    'mute', 'unmute',
    'promote', 'pro',
    'kickoffline', 'kickafk', 'ko', 'ka',
    'kick', 'remove',
    'block', 'ban',
    'unblock', 'unban',
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
        ChatLib.command(`msg BingoParty !p ${args.join(" ")}`)
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