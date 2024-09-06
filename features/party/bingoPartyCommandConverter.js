import settings from "../../settings"
import Party from "../../utils/Party"

/**
 * Primary commands for the party
 */
const primaryCommandNames = [
    '/p', '/party'
]

/**
 * Commands to allow through to bingoparty
 * TODO: put these in constants.js
 */
const allowList = [
    "disband",
    "transfer",
    "unmute",
    "mute",
    "pro",
    "prom",
    "promo",
    "promote",
    "testcommand",
    "testpermissions",
    "testperms",
    "test",
    "ka",
    "ko",
    "kickafk",
    "kickoffline",
    "remove",
    "kick",
    "block",
    "ban",
    "unblock",
    "unban",
    "close",
    "open",
    "public",
    "stream",
    "inv",
    "invite",
    "allinvite",
    "speak",
    "say",
    "rep",
    "repeat",
    "crep",
    "crepeat",
    "customrep",
    "customrepeat",
    "flea",
    "bf",
    "pl",
    "size",
    "lsbanned",
    "printallowed",
    "printAllowlist",
    "lsallowed",
    "rule",
    "poll",
    "publicguide",
    "g",
    "gd",
    "guide",
    "sg",
    "setguide",
    "help",
    "sendlimbo",
    "limbo",
    "addSplasher",
    "add",
    "removeSplasher",
    "cmd",
    "disable",
    "disableall",
    "enable",
    "enableall",
    "lstoggled",
    "lsdisabled",
    "printdeactivated",
    "printdisabled",
    "printDisabled",
    "query"
]

register("messageSent", (message, event) => {
    if (!settings().bingoPartyCommandConverter) return

    if (!Party.inBingoParty()) return

    const args = message.split(' ')
    if (!primaryCommandNames.some(cmd => cmd.toLowerCase() === args[0].toLowerCase())) return
    if (!allowList.some(cmdName => cmdName.toLowerCase() === args[1].toLowerCase())) return

    // check if a random string should be added
    let newMessage = args.slice(1).join(' ') // the slice removes /p
    if (settings().bingoPartyCommandRandomString) newMessage = Party.addRandomString(newMessage)
    const command = `/msg ${Party.getBotIGN()} !p ${newMessage}`

    cancel(event)
    ChatLib.say(command)
})
