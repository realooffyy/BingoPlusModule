import Settings from "../settings"

const commandName = Settings.bingoPartyAlias

if (commandName !== '') {
    register("command", (...args) => {
        ChatLib.command(`msg BingoParty !p ${args}`)
    })
    .setTabCompletions((args) => {
        return [
        'mute', 'unmute',
        'promote',
        'kickoffline', 'kickafk',
        'kick', 'remove',
        'block', 'ban',
        'unblock', 'unban',
        'poll',
        'stream', 'public', 'open',
        'invite', 'inv',
        'allinvite',
        'speak', 'say',
        'rule',
        'help',
        // leave the worst for last
        'transfer',
        'disband'
    ]})
    
    .setName(commandName)
}