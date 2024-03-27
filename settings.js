import { 
    @Vigilant, 
    @SwitchProperty, 
    @ButtonProperty, 
    @TextProperty 
} from "Vigilance"

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
    onlyOnBingo = true

    @SwitchProperty({
        name: "Community Goal Display",
        description: "Displays community goal data when on the Bingo Card menu.",
        category: "Bingo",
        subcategory: "Bingo Card"
    })
    communityGoalDisplay = true

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
    hideCompletedBingoGoals = false

    @SwitchProperty({
        name: "Chicken Head Timer",
        description: "Displays a timer for the Chicken Head cooldown.",
        category: "Bingo",
        subcategory: "Chicken Head Timer"
    })
    chickenHeadTimer = true

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
    hideEggLaidMessage = false

    @SwitchProperty({
        name: "Copy Achievements",
        description: "Automatically copies Bingo achievements to clipboard.",
        category: "Bingo",
        subcategory: "Chat"
    })
    copyAchievements = true

    @SwitchProperty({
        name: "Baker Blocker",
        description: "Prevents you from running &e/openbaker &ron Bingo.",
        category: "Bingo",
        subcategory: "Blockers"
    })
    bakerBlocker = true

    @SwitchProperty({
        name: "Block Party Travel Messages",
        description: "Block party travel notifications on Bingo.\n\n §9§l» §booffyy §eis traveling to §aPrivate Island §e§lFOLLOW§r\n §9§l» §6aphased §eis traveling to §aHub §e§lFOLLOW§r",
        category: "Bingo",
        subcategory: "Party"
    })
    blockPartyTravelMessages = false

    // Splasher

    @SwitchProperty({
        name: "Splasher Display",
        description: "Show a display with important information while in the Pet Care or Dungeon Hub.",
        category: "Splasher",
        subcategory: "Splasher Display"
    })
    splasherDisplay = true

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
        description: "Show the display everywhere.\n&cMay break in unsupported areas!",
        category: "Splasher",
        subcategory: "Splasher Display"
    })
    splasherDisplayEverywhere = false

    @SwitchProperty({
        name: "No Potions Warning",
        description: "Warns you if you enter the Pet Care in a mega hub without any splash potions.",
        category: "Splasher"
    })
    noPotionsWarning = true

    // Chat

    @SwitchProperty({
        name: "Oringo Cost",
        description: "Convert Oringo's Abiphone message to include the rarity and cost of each pet.",
        category: "Chat",
        subcategory: "Oringo"
    })
    oringoAbiphoneCost = true

    @SwitchProperty({
        name: "Fake Emojis",
        description: "Sends &6[MVP&c++&6]&r / &c[&fYOUTUBE&c]&r, Rank Gifting and other custom emojis without having the requirements! Run &e/emoji &ron Hypixel for the list of all emojis.\n&cMay be laggy!",
        category: "Chat",
        subcategory: "Sending"
    })
    fakeEmojis = false

    @SwitchProperty({
        name: "Maxwell",
        description: "Automatically skips Maxwell's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    skipperMaxwell = false

    @SwitchProperty({
        name: "Sam",
        description: "Automatically skips Sam's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    skipperSam = false

    @SwitchProperty({
        name: "Pesthunter Phillip",
        description: "Automatically skips Phillip's dialogue. &cIncomplete!",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    skipperPesthunterPhillip = false

    @SwitchProperty({
        name: "Lone Adventurer",
        description: "Automatically skips the Lone Adventurer's dialogue.",
        category: "Chat",
        subcategory: "Dialogue Skipper"
    })
    skipperLoneAdventurer = false

    @SwitchProperty({
        name: "Block Sky Mall Messages",
        description: "Blocks the daily Sky Mall messages while outside the mining islands.\n\n§r§bNew day! §r§eYour §r§2Sky Mall §r§ebuff changed!§r\n§r§8§oYou can disable this messaging by toggling Sky Mall in your /hotm!§r",
        category: "Chat",
        subcategory: "Blockers"
    })
    blockSkyMallMessages = false

    @SwitchProperty({
        name: "Block Parkour Messages",
        description: "Blocks the spammy parkour messages when AFKing on them.\n\n§r§aStarted parkour <name>!§r\n§aFinished parkour <name> in 00:00.999!§r\n§7+5 Island Points§r",
        category: "Chat",
        subcategory: "Blockers"
    })
    blockParkourMessages = false

    // Commands
    @SwitchProperty({
        name: "SkyCrypt Auto Open",
        description: "Automatically opens a new window when running the &e/skycrypt &ror &e/sky &rcommand.",
        category: "Commands"
    })
    skycryptAutoOpen = false

    @TextProperty({
        name: "Century Cake Island",
        description: "Visits a Cake Hub when running &e/cake&r.\nDefault: &aBingoSplasher&r",
        category: "Commands"
    })
    centuryCakeIsland = "BingoSplasher"
}

export default new Settings()
