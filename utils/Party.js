import { generateRandomString } from "./utils"
import constants from "./constants"

const partyLeaderRegex = [
    /^You have joined (?:\[.*?\] )?(\w{1,16})'s? party!$/, // https://regex101.com/r/gVoOq1/2
    /^Party Leader: (?:\[.*?\] )?(\w{1,16}) ●$/, // https://regex101.com/r/zcdveP/1
    /^The party was transferred to (?:\[.*?\] )?(\w{1,16}) by (?:\[.*?\] )?(?:\w{1,16})$/, // https://regex101.com/r/XGjPZp/2
    /^(?:\[.*?\] )?(?:\w{1,16}) has promoted (?:\[.*?\] )?(\w{1,16}) to Party Leader$/ // https://regex101.com/r/Ru6glS/1
]

const partyResetRegex = [
    /^You have been kicked from the party by (?:\[.*?\] )?(?:\w{1,16}) $/, // https://regex101.com/r/14gC5l/1
    "You left the party.",
    "The party was disbanded because the party leader disconnected."
]

// TODO: post-rewrite update

/**
 * Commands which should always append the random string to the end
 */
const alwaysRandomString = [
    "disband",
    "unmute", "mute",
    "testcommand", "testpermissions", "testperms", "test",
    "ka", "ko", "kickafk", "kickoffline",
    "close",
    "allinvite",
    "size",
    "printallowed", "printAllowlist", "lsallowed",
    "rule",
    "publicguide", "g", "gd", "guide",
    "help",
    "sendlimbo", "limbo",
    "lstoggled", "lsdisabled", "printdeactivated", "printdisabled", "printDisabled",
]

/**
 * Commands which should only append a random string to the end when there is an argument present
 */
const whenArgsRandomString = [
    "open", "public", "stream",
    'promote', 'pro', 'prom', 'promo',
    'unblock', 'unban',
    'invite', 'inv',
    'query', // if this gets added
    'transfer',
]

export default new class Party {
    constructor() {
        this.inParty = false
        this.leader = null

        // Leader
        partyLeaderRegex.forEach(regex => {
            register("chat", (leader) => {
                this.inParty = true
                this.leader = leader.toLowerCase()
            }).setCriteria(regex)
        })

        // Reset
        partyResetRegex.forEach(regex => {
            register("chat", () => {
                this.reset()
            }).setCriteria(regex)
        })
        
        register("serverDisconnect", () => {
            this.reset()
        })
    }

    inBingoParty() {
        return this.inParty && this.leader === this.getBotIGN()
    }

    getBotIGN() {
        return constants.BINGOPARTY_IGN.toLowerCase()
    }

    /**
     * Dev: Simulate a party
     * @param {String} param new leader
     */
    simulateParty(leader) {
        this.inParty = true
        this.leader = leader
    }

    reset() {
        this.inParty = false
        this.leader = null
    }

    /**
     * Adds on a random string of characters to bypass if eligible
     * @param {String} string string to append
     * @returns formatted/unformatted string
     */
    addRandomString(string) {
        args = string.split(" ")

        let shouldAdd = false
        if (whenArgsRandomString.some(cmd => cmd.toLowerCase() == args[0].toLowerCase()) && args[1]) shouldAdd = true
        if (alwaysRandomString.some(cmd => cmd.toLowerCase() == args[0].toLowerCase())) shouldAdd = true
        if (!shouldAdd) return string
        
        // TODO: potentially make something for commands like an [END] for the bot to interpret and omit
        return string + ` | ${generateRandomString(string.length * .33 < 6 ? 6 : string.length * .33)}`
    }
}
