import settings from "../../settings"
import constants from "../../utils/constants"
import Party from "../../utils/Party"

/**
 * Primary commands for the party
 */
const primaryCommandNames = [
    '/p', '/party'
]

/**
 * Commands to fully ignore
 */
const except = [
    '/pc', '/party chat', '/chat party',
    '/p leave', '/party leave',
    '/pl', '/p list', '/party list',
    // '/p transfer', '/party transfer'
]

register("messageSent", (message, event) => {
    if (!settings().bingoPartyCommandConverter) return

    if (!primaryCommandNames.some(cmd => message.startsWith(cmd + " "))) return
    if (!Party.inBingoParty()) return
    if (except.some(cmd => message.startsWith(cmd))) return

    // check if a random string should be added
    const newMessage = Party.addRandomString(message.split(' ').slice(1).join(' ')) // the slice removes the /p or /party part
    const command = `/msg ${constants.BINGOPARTY_IGN} !p ${newMessage}`

    cancel(event)
    ChatLib.say(command)
})
