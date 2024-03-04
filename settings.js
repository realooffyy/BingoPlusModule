import { @Vigilant, @SwitchProperty, @ButtonProperty } from "Vigilance"

@Vigilant("Bingo+/config", "Bingo+ Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Bingo", "NPC"];

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

    @SwitchProperty({
        name: "Only on Bingo",
        description: "Only enable mod features when on Bingo.",
        category: "General"
    })
    only_on_bingo = true

    // Bingo

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
        name: "Community Goal Display",
        description: "Displays community goal data when on the bingo card menu",
        category: "Bingo"
    })
    community_goal_display = true

    @SwitchProperty({
        name: "Baker Blocker",
        description: "Prevents you from running &e/openbaker &ron Bingo.",
        category: "Bingo",
        subcategory: "Blockers"
    })
    baker_blocker = true

    // NPC

    @SwitchProperty({
        name: "Maxwell",
        description: "Automatically skips Maxwell's dialogue.",
        category: "NPC",
        subcategory: "Dialogue Skipper"
    })
    maxwell = true

    @SwitchProperty({
        name: "Sam",
        description: "Automatically skips Sam's dialogue.",
        category: "NPC",
        subcategory: "Dialogue Skipper"
    })
    sam = true

    @SwitchProperty({
        name: "Pesthunter Phillip",
        description: "Automatically skips Phillip's dialogue.",
        category: "NPC",
        subcategory: "Dialogue Skipper"
    })
    pesthunter_phillip = true

    @SwitchProperty({
        name: "Lone Adventurer",
        description: "Automatically skips the Lone Adventurer's dialogue.",
        category: "NPC",
        subcategory: "Dialogue Skipper"
    })
    lone_adventurer = true

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&6Bingo&c+ &bv${JSON.parse(FileLib.read("Bingo+", "metadata.json")).version}\n&aBy ooffyy`)
    }
}

export default new Settings()