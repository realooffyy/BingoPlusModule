import settings from "../../settings"
import Party from "../../utils/Party"

const userRegex = "(?:\\[(.*?)\\] )?(\\w{1,16})"
const famousRanks = ["YOUTUBE", "ADMIN", "GM"]

filter('blockPartyLineBreak', /()()&9&m-----------------------------------------------------&r/)
filter('blockPartyTravelMessagesNew', /^()() &9&l».*$/) // https://regex101.com/r/w2zgat/1

// [VIP+] BingoSplasher joined the party.
filter('blockPartyJoinedTheParty', new RegExp(`^${userRegex} joined the party\\.$`))
// [VIP+] BingoSplasher has left the party.
filter('blockPartyLeftTheParty', new RegExp(`^${userRegex} left the party\\.$`))

// [VIP+] BingoSplasher has disconnected, they have 5 minutes to rejoin before they are removed from the party.
filter('blockPartyDisconnected', new RegExp(`^${userRegex} has disconnected, they have 5 minutes to rejoin before they are removed from the party\\.$`))
// [VIP+] BingoSplasher was removed from your party because they disconnected.
filter('blockPartyDisconnectedRemoved', new RegExp(`^${userRegex} was removed from your party because they disconnected\\.$`))

// [VIP+] BingoSplasher has rejoined.
filter('blockPartyRejoined', new RegExp(`^${userRegex} has rejoined\\.$`))
// The party leader [VIP+] BingoSplasher has rejoined.
filter('blockPartyLeaderRejoined', new RegExp(`^The party leader ${userRegex} has rejoined\\.$`))

// TODO: poll blocker

/**
 * Creates a blocker for certain message criteria.
 * @param {String} setting - the name of the setting to test against
 * @param {RegExp} criteria - the regex to be blocked
 */
function filter(setting, criteria) {
    register("chat", (rank, username, e) => {
        if (settings().blockPartyIgnoreLeaderEvents
                && username.toLowerCase() === Party.leader) return
        if (settings().blockPartyIgnoreFamousPeopleEvents
                && famousRanks.includes(rank)) return

        if (settings()[setting] == 0) return
        if ((Party.inBingoParty() && settings()[setting] == 1)
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