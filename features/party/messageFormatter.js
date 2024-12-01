import settings from "../../settings"
import constants from "../../utils/constants"
import { onChatPacket } from "../../utils/Events"
import Party from "../../utils/Party"

const incomingRegex = new RegExp(`^(?:From|Voicemail) (?:\\[.*?\\] )?${Party.getBotIGN(false)}: (.*)$`)
const outgoingRegex = new RegExp(`^To (?:\\[.*?\\] )?${Party.getBotIGN(false)}: !p .*$`)

// incoming formatter
onChatPacket((message, event) => {
    if (!settings().bingoPartyIncomingFormatter) return
    const prefix = settings().bingoPartyMessageFormatterPrefix !== "" ?
                    settings().bingoPartyMessageFormatterPrefix :
                    constants.DEFAULT_MESSAGE_FORMATTER_PREFIX
                    
    let final = `${prefix}&r${message.slice(0, message.lastIndexOf("|"))}`
    ChatLib.chat(final)
    cancel(event)
}).setCriteria(incomingRegex)
// From [MVP++] BingoParty: You have permissions! Your permissions are Staff (Level: 3) | IzQiVmeU3jQoPJgOO6db

// outgoing formatter
onChatPacket((event) => {
    if (!settings().bingoPartyOutgoingHider) return
    cancel(event)
}).setCriteria(outgoingRegex)