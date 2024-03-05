import { @Vigilant, @SwitchProperty, @ButtonProperty } from "Vigilance"

@Vigilant("Bingo+/config", "Bingo+ Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Bingo", "Chat"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings {

    // General

    @ButtonProperty({
        name: "Discord",
        description: "Join the Bingo+ Discord!",
        category: "General",
        placeholder: "Open"
    })
    joinDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL('https://discord.gg/P8rahWWA7b').toURI());
        //ChatLib.command("ct copy https://discord.gg/P8rahWWA7b", true);
    }


    // Bingo

    @SwitchProperty({
        name: "Only on Bingo",
        description: "Only enable features in this category on Bingo profiles",
        category: "Bingo"
    })
    only_on_bingo = true

    @SwitchProperty({
        name: "Community Goal Display",
        description: "Displays community goal data when on the Bingo Card menu.",
        category: "Bingo"
    })
    community_goal_display = true

    @SwitchProperty({
        name: "Chicken Head Timer",
        description: "Displays a timer for the Chicken Head cooldown.",
        category: "Bingo",
        subcategory: "Timers"
    })
    chicken_head_timer = true

    @SwitchProperty({
        name: "Copy Achievements",
        description: "Automatically copies Bingo achievements to clipboard.",
        category: "Bingo",
        subcategory: "Chat"
    })
    copy_achievements = true


    @SwitchProperty({
        name: "Baker Blocker",
        description: "Prevents you from running &e/openbaker &ron Bingo.",
        category: "Bingo",
        subcategory: "Blockers"
    })
    baker_blocker = true

    @SwitchProperty({
        name: "Block Party Travel Messages",
        description: "Block party travel notifications on Bingo.\n",
        category: "Bingo",
        subcategory: "Party"
    })
    block_party_travel_messages = false

    // Chat

    @SwitchProperty({
        name: "Fake Emojis",
        description: "Sends &6[MVP&c++&6]&r / &c[&fYOUTUBE&c]&r and Rank Gifting emojis without having the requirements!\n&cMay be laggy!",
        category: "Chat",
        subcategory: "Sending"
    })
    fake_emojis = false

    @SwitchProperty({
        name: "Maxwell",
        description: "Automatically skips Maxwell's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    maxwell = true

    @SwitchProperty({
        name: "Sam",
        description: "Automatically skips Sam's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    sam = true

    @SwitchProperty({
        name: "Pesthunter Phillip",
        description: "Automatically skips Phillip's dialogue. &cIncomplete!",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    pesthunter_phillip = true

    @SwitchProperty({
        name: "Lone Adventurer",
        description: "Automatically skips the Lone Adventurer's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    lone_adventurer = true

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&6Bingo&c+ &bv${JSON.parse(FileLib.read("Bingo+", "metadata.json")).version}\n&aBy ooffyy`)
    }
}

export default new Settings()