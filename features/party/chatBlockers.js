import settings from "../../settings"
import constants from "../../utils/constants"
import Party from "../../utils/Party"

const partyLineBreak = '&9&m-----------------------------------------------------&r'

filter('blockPartyLineBreak', partyLineBreak)
filter('blockPartyTravelMessagesNew', / &9&l».*/) // https://regex101.com/r/w2zgat/1
filter('blockPartyJoinLeave', /.* (?:has disconnected, they have 5 minutes to rejoin before they are removed from the party|was removed from your party because they disconnected|has left the party|joined the party)\./, true) // https://regex101.com/r/ycPbfQ/3

/**
 * Creates a blocker for certain message criteria.
 * @param {String} setting - the name of the setting to test against
 * @param {RegExp} criteria - the regex to be blocked
 */
function filter(setting, criteria) {
    register("chat", (e) => {
        if (settings()[setting] == 0) return
        if ((Party.leader === constants.BINGOPARTY_IGN && settings()[setting] == 1)
         || settings()[setting] == 2) cancel(e)
    }).setCriteria(criteria)
}

// Discord red text blocker
register("chat", (event) => {
    if (!settings().blockPartyDiscordWarning) return

    let message = new Message(EventLib.getMessage(event)).getMessageParts()
    let newMessage = new Message()
    let skipNext = false
    
    message.forEach(component => {
        let text = component.getText()

        if (text == '\n§r') { 
            skipNext = true
        } else if (!(skipNext && text == '§cPlease be mindful of Discord links in chat as they may pose a security risk§r')) {
            newMessage.addTextComponent(component)
            skipNext = false
        }
    })

    newMessage.chat()
    cancel(event)
}).setCriteria(/^Party > .*Please be mindful of Discord links in chat as they may pose a security risk$/s)