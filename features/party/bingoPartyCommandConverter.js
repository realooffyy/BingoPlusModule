/*

i changed my mind

import settings from "../../settings"
import constants from "../../utils/constants"
import Party from "../../utils/Party"

const except = [
    '/pc',
    '/p leave',
    '/party leave'
]

register("messageSent", (m, e) => {
    if (!settings().bingoPartyCommandConverter) return
    if (!((m.startsWith('/p') || m.startsWith('/party')) && Party.leader == constants.BINGOPARTY_IGN)) return
    cancel(event)
    m.replace('/p', '/msg BingoParty !p')
})
*/