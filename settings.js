import { @Vigilant, @SwitchProperty, @ButtonProperty, @TextProperty} from "Vigilance"

@Vigilant("Bingo+/config", "Bingo+ Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Bingo", "Splasher", "Chat", "Commands"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
    
class Settings {
    constructor() {
        this.initialize(this)
        
        this.setCategoryDescription("General",
            `
            &6Bingo&c+ &bv${JSON.parse(FileLib.read("Bingo+", "metadata.json")).version}
            &aBy ooffyy
            `
        )

        this.setSubcategoryDescription("Chat", "Dialogue Skipper",
            `&cUse at your own risk!`)

    }

    chickenHeadTimerMove = new Gui()
    communityGoalDisplayMove = new Gui()
    splasherDisplayMove = new Gui()

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
        description: "Only enable features in the &6Bingo &rcategory on Bingo profiles.",
        category: "Bingo"
    })
    only_on_bingo = true

    @SwitchProperty({
        name: "Community Goal Display",
        description: "Displays community goal data when on the Bingo Card menu.",
        category: "Bingo",
        subcategory: "Bingo Card"
    })
    community_goal_display = true

    @ButtonProperty({
        name: "Move",
        description: "Move the Community Goal Display",
        category: "Bingo",
        subcategory: "Bingo Card"
    })
    MoveCommunityGoalDisplay() {
        this.communityGoalDisplayMove.open()
    }

    @SwitchProperty({
        name: "Hide Completed Bingo Goals",
        description: "Stops rendering completed Bingo goals.",
        category: "Bingo",
        subcategory: "Bingo Card"
    })
    hide_completed_bingo_goals = false

    @SwitchProperty({
        name: "Chicken Head Timer",
        description: "Displays a timer for the Chicken Head cooldown.",
        category: "Bingo",
        subcategory: "Chicken Head Timer"
    })
    chicken_head_timer = true

    @ButtonProperty({
        name: "Move",
        description: "Move the Chicken Head Timer.",
        category: "Bingo",
        subcategory: "Chicken Head Timer"
    })
    MoveChickenHeadTimer() {
        this.chickenHeadTimerMove.open()
    }

    @SwitchProperty({
        name: "Hide Egg Laid Message",
        description: "Hides the §r§aYou laid an egg!§r message.",
        category: "Bingo",
        subcategory: "Chicken Head Timer"
    })
    hide_egg_laid_message = false

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
        description: "Block party travel notifications on Bingo.\n\n §9§l» §booffyy §eis traveling to §aPrivate Island §e§lFOLLOW§r\n §9§l» §6aphased §eis traveling to §aHub §e§lFOLLOW§r",
        category: "Bingo",
        subcategory: "Party"
    })
    block_party_travel_messages = false

    // Splasher

    @SwitchProperty({
        name: "Splasher Display",
        description: "Show a display with important information while in the Pet Care or Dungeon Hub.",
        category: "Splasher",
        subcategory: "Splasher Display"
    })
    splasher_display = true

    @ButtonProperty({
        name: "Move",
        description: "Move the Splasher Display",
        category: "Splasher",
        subcategory: "Splasher Display"
    })
    MoveLeecherDisplay() {
        this.splasherDisplayMove.open()
    }

    @SwitchProperty({
        name: "Show everywhere",
        description: "Show the display everywhere.\n&cMay break!",
        category: "Splasher",
        subcategory: "Splasher Display"
    })
    splasher_display_everywhere = false

    @SwitchProperty({
        name: "No Potions Warning",
        description: "Warns you if you enter the Pet Care in a mega hub without any splash potions.",
        category: "Splasher"
    })
    no_potions_warning = true

    // Chat

    @SwitchProperty({
        name: "Fake Emojis",
        description: "Sends &6[MVP&c++&6]&r / &c[&fYOUTUBE&c]&r, Rank Gifting and other custom emojis without having the requirements! Run &e/emoji &ron Hypixel for the list of all emojis.\n&cMay be laggy!",
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
    maxwell = false

    @SwitchProperty({
        name: "Sam",
        description: "Automatically skips Sam's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    sam = false

    @SwitchProperty({
        name: "Pesthunter Phillip",
        description: "Automatically skips Phillip's dialogue. &cIncomplete!",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    pesthunter_phillip = false

    @SwitchProperty({
        name: "Lone Adventurer",
        description: "Automatically skips the Lone Adventurer's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    lone_adventurer = false

    @SwitchProperty({
        name: "Block Sky Mall Messages",
        description: "Blocks the daily Sky Mall messages while outside the mining islands.\n\n§r§bNew day! §r§eYour §r§2Sky Mall §r§ebuff changed!§r\n§r§8§oYou can disable this messaging by toggling Sky Mall in your /hotm!§r",
        category: "Chat",
        subcategory: "Blockers"
    })
    block_sky_mall_messages = false

    @SwitchProperty({
        name: "Block Parkour Messages",
        description: "Blocks the spammy parkour messages when AFKing on them.\n\n§r§aStarted parkour <name>!§r\n§aFinished parkour <name> in 00:00.999!§r\n§7+5 Island Points§r",
        category: "Chat",
        subcategory: "Blockers"
    })
    block_parkour_messages = false

    // Commands
    @SwitchProperty({
        name: "SkyCrypt Auto Open",
        description: "Automatically opens a new window when running the &e/skycrypt &ror &e/sky &rcommand.",
        category: "Commands"
    })
    skycrypt_auto_open = false

    @TextProperty({
        name: "Century Cake Island",
        description: "Visits a Cake Hub when running &e/cake&r.\nDefault: &aBingoSplasher&r",
        category: "Commands"
    })
    century_cake_island = "BingoSplasher"
}

export default new Settings()
