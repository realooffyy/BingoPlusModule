import { 
    @ButtonProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty
} from '../Vigilance/index'

@Vigilant("BingoPlus/config", "Bingo+ Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Bingo", "Party", "Splasher", "Chat", "Commands"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
    
class Settings {
    constructor() {
        this.initialize(this)
        
        this.setCategoryDescription("General",
            `
            &6Bingo&c+ &bv${JSON.parse(FileLib.read("BingoPlus", "metadata.json")).version}
            &aBy ooffyy
            `
        )
        this.setSubcategoryDescription("Party", "Party Travel Messages",
            `It's recommended to disable Party Travel Messages entirely: &aSkyblock Menu -> Settings -> Comms -> Co-op Travel Notifications`)
        this.setSubcategoryDescription("Party", "Bingo Party",
            `Thanks to &aaphased&r and &aTryp0MC&r for hosting BingoParty!`)
        this.setSubcategoryDescription("Chat", "Dialogue Skipper",
            `&cUse at your own risk!`)

        this.addDependency("Show text", "Rat Helper")
        this.addDependency("Show beacon", "Rat Helper")

        this.addDependency("Top Hubs", "Hub Selector Display")
        this.addDependency("Highlight Best Hubs", "Hub Selector Display")
        this.addDependency("Hub Restart Warning", "Hub Selector Display")

        this.addDependency("Show everywhere", "Splasher Display")

        this.addDependency("Copy as Discord message","Oringo Abiphone Cost")
    }

    chickenHeadTimerMove = new Gui()
    communityGoalDisplayMove = new Gui()
    splasherDisplayMove = new Gui()
    hubSelectorDisplayMove = new Gui()

    // General

    @ButtonProperty({
        name: "Discord",
        description: "Click the button to join the Discord.",
        category: "General",
        subcategory: "Discord",
        placeholder: "Join"
    })
    joinDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL('https://discord.gg/P8rahWWA7b').toURI())
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
        subcategory: "Bingo Card",
        placeholder: "Move"
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
        subcategory: "Chicken Head Timer",
        placeholder: "Move"
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
        description: "Automatically copies some Bingo achievements to clipboard.\n&6Incomplete!",
        category: "Bingo",
        subcategory: "Chat"
    })
    copyAchievements = true

    @SwitchProperty({
        name: "Baker Blocker",
        description: "Prevents you from running &e/openbaker &r while on a Bingo profile.",
        category: "Bingo",
        subcategory: "Blockers"
    })
    bakerBlocker = true
  
    @SwitchProperty({
        name: "Rat Helper",
        description: "Shows waypoints for the general location of Rat spawns.\n&aToggleable with &6/rats&a.",
        category: "Bingo",
        subcategory: "Rat Helper"
    })
    ratHelper = false

    @SwitchProperty({
        name: "Show text",
        description: "Shows text next to each waypoint with information on how to access it.",
        category: "Bingo",
        subcategory: "Rat Helper"
    })
    ratHelperShowText = true

    @SwitchProperty({
        name: "Show beacon",
        description: "Shows a beacon at each waypoint.",
        category: "Bingo",
        subcategory: "Rat Helper"
    })
    ratHelperShowBeacon = true
  
    // Party

    @SwitchProperty({
        name: "Block Party Travel Messages",
        description: "Blocks party travel notifications in chat.\n&aYou can toggle this with &6/ptravel&a!&r\n\n §9§l» §booffyy §eis traveling to §aPrivate Island §e§lFOLLOW§r\n §9§l» §6aphased §eis traveling to §aHub §e§lFOLLOW§r",
        category: "Party",
        subcategory: "Party Travel Messages"
    })
    blockPartyTravelMessages = false

    @SwitchProperty({
        name: "Show status",
        description: "Tells you if travel messages are enabled or disabled when you join a party.",
        category: "Party",
        subcategory: "Party Travel Messages"
    })
    blockPartyTravelMessagesWarning = false

    @TextProperty({
        name: "Alias for /msg BingoParty !p",
        description: "Create an alias for &6/msg BingoParty !p&r.\n&cRun /ct load after changing alias!\nLeave blank to disable.\n&cThis is intended for splashers/allowed users only!",
        category: "Party",
        subcategory: "Bingo Party"
    })
    bingoPartyAlias = ""

    @ButtonProperty({
        name: "BingoParty Commands Documentation",
        description: "Click the button to open this in your browser.",
        category: "Party",
        subcategory: "Bingo Party",
        placeholder: "GitHub"
    })
    openBPDocumentation() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL('https://github.com/aphased/BingoPartyCommands').toURI())
    }
  
    // Splasher

    @SwitchProperty({
        name: "Splasher Display",
        description: "Show a display with important information while in the Pet Care area.",
        category: "Splasher",
        subcategory: "Splasher Display"
    })
    splasherDisplay = true

    @SwitchProperty({
        name: "Show everywhere",
        description: "Show the display everywhere.\n&cMay break in unsupported areas!",
        category: "Splasher",
        subcategory: "Splasher Display"
    })
    splasherDisplayEverywhere = false

    @SliderProperty({
        name: "Splasher Display Distance",
        description: "Detect players until this distance.\n&a5 is recommended",
        category: "Splasher",
        subcategory: "Splasher Display",
        min: 1,
        max: 10
    })
    splasherDisplayDistance = 5;

    @ButtonProperty({
        name: "Move",
        description: "Move the Splasher Display",
        category: "Splasher",
        subcategory: "Splasher Display",
        placeholder: "Move"
    })
    MoveSplasherDisplay() {
        this.splasherDisplayMove.open()
    }

    @SwitchProperty({
        name: "No Potions Warning",
        description: "Warns you if you enter the Pet Care in a mega hub without any splash potions.",
        category: "Splasher"
    })
    noPotionsWarning = false

    @SwitchProperty({
        name: "Hub Selector Display",
        description: "Show a display with the lowest player hubs while in the Hub Selector.",
        category: "Splasher",
        subcategory: "Hub Selector Display"
    })
    hubSelectorDisplay = false

    @SwitchProperty({
        name: "Hub Restart Warning",
        description: "Sends a message in chat if a restarting hub is detected.\nHub numbers may be shifting when this happens.",
        category: "Splasher",
        subcategory: "Hub Selector Display"
    })
    hubRestartWarning = true

    @SliderProperty({
        name: "Top Hubs",
        description: "How many hubs to show",
        category: "Splasher",
        subcategory: "Hub Selector Display",
        min: 1,
        max: 28
    })
    hubSelectorDisplayTopHubs = 5;

    @SwitchProperty({
        name: "Highlight Best Hubs",
        description: "Highlights the lowest player hubs.\n&8Disable SBE's Hub Colors for the best experience!",
        category: "Splasher",
        subcategory: "Hub Selector Display"
    })
    hubSelectorHighlightBestHubs = false

    @ButtonProperty({
        name: "Move",
        description: "Move the Lowest Hub Display",
        category: "Splasher",
        subcategory: "Hub Selector Display",
        placeholder: "Move"
    })
    MoveHubSelectorDisplay() {
        this.hubSelectorDisplayMove.open()
    }

    // Chat

    @SwitchProperty({
        name: "Oringo Abiphone Cost",
        description: "Convert Oringo's Abiphone message to include the rarity and cost of each pet.",
        category: "Chat",
        subcategory: "Oringo"
    })
    oringoAbiphoneCost = true

    @SwitchProperty({
        name: "Copy as Discord message",
        description: "Also automatically copy this message to send in Discord.",
        category: "Chat",
        subcategory: "Oringo"
    })
    oringoDiscordCopy = true

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

    // Commands

    @TextProperty({
        name: "Century Cake Island",
        description: "Visits a Cake Hub when running &e/cake&r.\nDefault: &aBingoSplasher&r",
        category: "Commands"
    })
    centuryCakeIsland = "BingoSplasher"
}

export default new Settings()
