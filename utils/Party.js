const removeRank = (name) => name.replace(/(\[[A-z]+\++\] )/, "")

export default new class Party {
    constructor() {
        this.inParty = false
        this.leader = null

        register("chat", (leader) => {
            this.inParty = true
            this.leader = removeRank(leader)
        }).setCriteria(/^You have joined (.+)'s? party!$/) // https://regex101.com/r/gVoOq1/1

        register("chat", (leader) => {
            this.inParty = true
            this.leader = removeRank(leader)
        }).setCriteria(/^Party Leader: (.+) ●$/) // https://regex101.com/r/gVoOq1/1

        register("chat", () => {
            this.inParty = false
        }).setCriteria("You left the party.")
    }


    reset() {
        this.inParty = false
        this.leader = null
    }
}