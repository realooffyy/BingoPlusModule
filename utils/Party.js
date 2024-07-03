const removeRank = (name) => name.replace(/(\[[A-z]+\++\] )/, "")

export default new class Party {
    constructor() {
        // this.inParty = null
        this.leader = null

        register("chat", (leader) => {
            this.leader = removeRank(leader)
            ChatLib.chat(this.leader)
        }).setCriteria(/^You have joined (.+)'s? party!$/) // https://regex101.com/r/gVoOq1/1

        register("chat", (leader) => {
            this.leader = removeRank(leader)
            ChatLib.chat(this.leader)
        }).setCriteria(/^Party Leader: (.+) ●$/) // https://regex101.com/r/gVoOq1/1
    }

    reset() {
        // this.inParty = null
        this.leader = null
    }
}