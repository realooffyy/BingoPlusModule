import { 
    @ButtonProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty,
    @SelectorProperty
} from '../Vigilance/index'

@Vigilant("BingoPlus/data", "Bingo+ Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Bingo", "Other", "Party", "Splasher", "Chat", "Commands"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },

    getSubcategoryComparator: () => (a, b) => {
        const subcategories = [];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },

    //getPropertyComparator: () => (a, b) => {
        //const names = ["Do action!!!", "password", "text", "Color Picker"];

        //return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    //}
})
    
class Settings {
    constructor() {
        this.initialize(this)
        
        this.setCategoryDescription("General",
            `
            &6Bingo&c+ &bv${JSON.parse(FileLib.read("BingoPlus", "metadata.json")).version}
            &aBy &dooffyy&r

            &c[!] The config has been reset since &bv1.0.0&c; you may need to change some of your settings!
            `
        )

        this.setSubcategoryDescription("Party", "BingoParty Moderation",
            `Thanks to &aaphased&r and &aTryp0MC&r for hosting BingoParty!
&8This section is intended for splashers from Bingo Brewers and other allowed users.`)
        this.setSubcategoryDescription("Party", "Message Blockers",
            `&cOff&r: Messages won't be blocked
&6Only in Bingo Party&r: Messages will be blocked when in §6[MVP§r§c++§r§6] BingoParty§r's party
&aEverywhere&r: Message will always be blocked

If a BingoParty blocker is not working, try running &a/p list&r.`)
            // It's recommended to disable Party Travel Messages entirely: &aSkyblock Menu -> Settings -> Comms -> Co-op Travel Notifications

        this.setSubcategoryDescription("Chat", "Dialogue Skipper",
            `&cDisabled as the current method is slightly cheaty, will be reworked eventually`)

        this.addDependency("Don't round", "Bingo Timer")
        this.addDependency("Show timer everywhere", "Bingo Timer")

        this.addDependency("Show text", "Rat Waypoints")
        this.addDependency("Show beacon", "Rat Waypoints")

        this.addDependency("Top Hubs", "Hub Selector Display")
        this.addDependency("Highlight Best Hubs", "Hub Selector Display")
        this.addDependency("Hub Restart Warning", "Hub Selector Display")

        this.addDependency("Show everywhere", "Splasher Display")

        this.addDependency("Copy as Discord message", "Oringo Abiphone Cost")
    }

    hubSelectorDisplayMove = new Gui()

    // General

    @ButtonProperty({
        name: "Bingo Party",
        category: "General",
        placeholder: "/p join BingoParty"
    })
    runBingoCommand() {
        Client.currentGui.close()
        ChatLib.command('p join BingoParty')
    }

    @ButtonProperty({
        name: "Bingo Menu",
        category: "General",
        placeholder: "/bingo"
    })
    runBingoPartyJoinCommand() {
        Client.currentGui.close()
        ChatLib.command('bingo')
    }

    @ButtonProperty({
        name: "Discord",
        description: "Click the button to join my discord.",
        category: "General",
        placeholder: "Join"
    })
    joinDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL('https://discord.gg/P8rahWWA7b').toURI())
    }

    // Bingo

    @SwitchProperty({
        name: "Community Goal Display",
        description: "Displays community goal data when on the Bingo Card menu.",
        category: "Bingo",
        subcategory: "Community Goal Display"
    })
    communityGoalDisplay = true

    @ButtonProperty({
        name: "Move",
        description: "Move the Community Goal Display",
        category: "Bingo",
        subcategory: "Community Goal Display",
        placeholder: "Move"
    })
    MoveCommunityGoalDisplay() {
        ChatLib.command('b+ move communityGoalDisplay', true)
    }

    @SwitchProperty({
        name: "Hide Completed Bingo Goals",
        description: "Stops rendering completed Bingo goals everywhere.",
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
        ChatLib.command('b+ move chickenHeadTimerDisplay', true)
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
        subcategory: "Achievements"
    })
    copyAchievements = true

    @SwitchProperty({
        name: "Send in guild",
        description: "Sends achievements to guild",
        category: "Bingo",
        subcategory: "Achievements"
    })
    autoSendAchievementsInGuild = false

    @SwitchProperty({
        name: "Send in party",
        description: "Sends achievements to party",
        category: "Bingo",
        subcategory: "Achievements"
    })
    autoSendAchievementsInParty = false

    @SwitchProperty({
        name: "Baker Blocker",
        description: "Prevents you from running &e/openbaker &r while on a Bingo profile.",
        category: "Bingo",
        subcategory: "Blockers"
    })
    bakerBlocker = true

    @SwitchProperty({
        name: "Bingo Card Display",
        description: "Shows the Bingo Card on-screen.",
        category: "Bingo",
        subcategory: "Bingo Card Display"
    })
    bingoCardDisplay = false

    @ButtonProperty({
        name: "Move",
        description: "Move the Bingo Card Display.",
        category: "Bingo",
        subcategory: "Bingo Card Display",
        placeholder: "Move"
    })
    MoveBingoCardDisplay() {
        ChatLib.command('b+ move bingoCardDisplay', true)
    }

    @SwitchProperty({
        name: "Bingo Timer",
        description: "Displays time until a Bingo starts, ends, and profile deletion.",
        category: "Bingo",
        subcategory: "Bingo Timer Display"
    })
    bingoTimerDisplay = false

    @SwitchProperty({
        name: "Don't round",
        description: "Leaves the time as day:hour:minute:second and doesn't round.",
        category: "Bingo",
        subcategory: "Bingo Timer Display"
    })
    bingoTimerDisplayDontRound = false

    @SwitchProperty({
        name: "Show timer everywhere",
        description: "Shows timer while not on a Bingo profile.",
        category: "Bingo",
        subcategory: "Bingo Timer Display"
    })
    bingoTimerDisplayEverywhere = false

    @ButtonProperty({
        name: "Move",
        description: "Move the Bingo Timer Display.",
        category: "Bingo",
        subcategory: "Bingo Timer Display",
        placeholder: "Move"
    })
    MoveBingoTimerDisplay() {
        ChatLib.command('b+ move bingoTimerDisplay', true)
    }

    @SwitchProperty({
        name: "Puzzler solver",
        description: "Solves the Puzzler's riddle in the Dwarven Mines.",
        category: "Bingo",
        subcategory: "Puzzler"
    })
    puzzlerSolver = true

    @SwitchProperty({
        name: "Accurate playtime",
        description: "Shows a more accurate Bingo playtime by measuring each second. Use &a/playtime &rto view.\n&cYou should preferably have this feature enabled before creating your Bingo profile for the most accurate time!",
        category: "Bingo",
        subcategory: "Playtime"
    })
    accurateBingoPlaytime = true

    // Other
    
    @SwitchProperty({
        name: "Wind Compass Display",
        description: "Shows a display with a wind compass.",
        category: "Other",
        subcategory: "Gone with the Wind"
    })
    windCompassDisplay = false

    @ButtonProperty({
        name: "Move",
        description: "Move the Wind Compass Display.",
        category: "Other",
        subcategory: "Gone with the Wind",
        placeholder: "Move"
    })
    MoveWindCompassDisplay() {
        ChatLib.command('b+ move windCompassDisplay', true)
    }
/*
    @SwitchProperty({
        name: "Wind guide",
        description: "Draws lines to guide you where to face for the max mining speed.",
        category: "Other",
        subcategory: "Gone with the Wind"
    })
    windCompassGuide = false
*/

    @SwitchProperty({
        name: "Rat Waypoints",
        description: "Shows waypoints for the general location of Rat spawns.\n&aToggleable with &6/rats&a.",
        category: "Other",
        subcategory: "Rats"
    })
    ratWaypoints = false

    @SwitchProperty({
        name: "Show text",
        description: "Shows text next to each waypoint with information on how to access it.",
        category: "Other",
        subcategory: "Rats"
    })
    ratWaypointsShowText = true

    @SwitchProperty({
        name: "Show beacon",
        description: "Shows a beacon at each waypoint.",
        category: "Other",
        subcategory: "Rats"
    })
    ratWaypointsShowBeacon = true

/*
    @SwitchProperty({
        name: "Dreadlord Sword alert",
        description: "Warns you when you pickup a Dreadlord Sword on Bingo.",
        category: "Bingo",
        subcategory: "Dreadlord Sword"
    })
    dreadlordSwordAlert = false
*/
    
/*
    @SwitchProperty({
        name: "Broken Goal Helper",
        description: "Sends a chat message with a solution to a broken goal when opening the Bingo Card.",
        category: "Bingo",
        subcategory: "Broken Goal Helper"
    })
    brokenBingoGoalHelper = false
*/
    // Party
    
    /*
    @SwitchProperty({
        name: "Show message blocker status",
        description: "Tells you which blockers are active when joining a party",
        category: "Party",
        subcategory: "Message Blockers"
    })
    blockPartyMessagesStatus = false
    */

    @SelectorProperty({
        name: "Block Party Line Breaks",
        description: "Blocks the blue separator line.\nRecommended if using the other blockers!", // \n&aToggleable with &6/ptravel&a.&r\n\n §9§l» §booffyy §eis traveling to §aPrivate Island §e§lFOLLOW§r\n §9§l» §6aphased §eis traveling to §aHub §e§lFOLLOW§r
        category: "Party",
        subcategory: "Message Blockers",
        options: ['Off', 'Only in Bingo Party', 'Everywhere']
    })
    blockPartyLineBreak = 0;

    @SelectorProperty({
        name: "Block Party Travel Notifications",
        description: "Blocks party travel notifications.\n&8Instead of using 'Everywhere' consider disabling Co-op Travel Notifications in SkyBlock settings!", // \n&aToggleable with &6/ptravel&a.&r\n\n §9§l» §booffyy §eis traveling to §aPrivate Island §e§lFOLLOW§r\n §9§l» §6aphased §eis traveling to §aHub §e§lFOLLOW§r
        category: "Party",
        subcategory: "Message Blockers",
        options: ['Off', 'Only in Bingo Party', 'Everywhere']
    })
    blockPartyTravelMessagesNew = 0;

    @SelectorProperty({
        name: "Block Join/Leave",
        description: "Blocks party join/leave messages. This includes the 5 min disconnect messages.",
        category: "Party",
        subcategory: "Message Blockers",
        options: ['Off', 'Only in Bingo Party', 'Everywhere']
    })
    blockPartyJoinLeave = 0;

    @TextProperty({
        name: "Alias for /msg BingoParty !p",
        description: "Creates an alias for &6/msg BingoParty !p&r. Leave blank to disable.\nExample: &aap&r\n&cRun /ct load after changing alias!",
        category: "Party",
        subcategory: "BingoParty Moderation"
    })
    bingoPartyAlias = ""

    @ButtonProperty({
        name: "BingoParty Commands Documentation",
        description: "Click the button to open this in your browser.",
        category: "Party",
        subcategory: "BingoParty Moderation",
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
        ChatLib.command('b+ move splasherDisplay', true)
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
