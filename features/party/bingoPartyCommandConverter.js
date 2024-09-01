import settings from "../../settings"
import { data } from "../../utils/constants"
import Party from "../../utils/Party"

/**
 * Primary commands for the party
 */
const primaryCommandNames = [
    '/p', '/party'
]

/**
 * Commands to allow through to bingoparty
 */
const allowList = data.moduleData.bingoParty.allowList

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
