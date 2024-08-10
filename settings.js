import FuckYouIWantToUseThatName from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import constants from "./utils/constants"

const categories = ["General", "Bingo", "Other", "Party", "Splasher", "Chat", "Commands"]
const version = JSON.parse(FileLib.read("BingoPlus", "metadata.json")).version

const config = new DefaultConfig("BingoPlus", "data/settings.json")

// General

.addButton({
    category: "General",
    configName: "joinDiscord",
    title: "Join the Discord",
    description: "",
    placeHolder: "Discord",
    onClick() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL('https://discord.gg/P8rahWWA7b').toURI())
    } // AVOID NOAMM9 AT ALL COSTS
})
.addButton({
    category: "General",
    configName: "runBingoCommand",
    title: "Bingo Menu",
    description: "",
    placeHolder: "/bingo",
    onClick() {
        Client.currentGui.close()
        ChatLib.command('bingo')
    }
})
.addButton({
    category: "General",
    configName: "runBingoPartyJoinCommand",
    title: "Bingo Party",
    description: "",
    placeHolder: "/p join BingoParty",
    onClick() {
        Client.currentGui.close()
        ChatLib.command('p join BingoParty')
    }
})

// Bingo

.addSwitch({
    category: "Bingo",
    configName: "communityGoalDisplay",
    title: "Community Goal Display",
    description: "Displays community goal data when on the Bingo Card menu.",
    subcategory: "Community Goal Display",
    value: true
})
.addButton({
    category: "Bingo",
    configName: "moveCommunityGoalDisplay",
    title: "Move",
    description: "Move the Community Goal Display",
    subcategory: "Community Goal Display",
    placeHolder: "Move",
    onClick() {
        ChatLib.command('b+ move communityGoalDisplay', true)
    }
})

.addSwitch({
    category: "Bingo",
    configName: "hideCompletedBingoGoals",
    title: "Hide Completed Bingo Goals",
    description: "Stops rendering completed Bingo goals everywhere.",
    subcategory: "Bingo Card"
})

.addSwitch({
    category: "Bingo",
    configName: "copyAchievements",
    title: "Copy Achievements",
    description: "Automatically copies some Bingo achievements to clipboard.\n&6Incomplete!",
    subcategory: "Achievements",
    value: true
})
.addSwitch({
    category: "Bingo",
    configName: "autoSendAchievementsInGuild",
    title: "Send in guild",
    description: "Sends achievements to guild",
    subcategory: "Achievements"
})
.addSwitch({
    category: "Bingo",
    configName: "autoSendAchievementsInParty",
    title: "Send in party",
    description: "Sends achievements to party",
    subcategory: "Achievements"
})

.addSwitch({
    category: "Bingo",
    configName: "bakerBlocker",
    title: "Baker Blocker",
    description: "Prevents you from running &e/openbaker &r while on a Bingo profile.",
    subcategory: "Blockers",
    value: true
})

.addSwitch({
    category: "Bingo",
    configName: "bingoCardDisplay",
    title: "Bingo Card Display",
    description: "Shows the Bingo Card on-screen.",
    subcategory: "Bingo Card Display"
})
.addButton({
    category: "Bingo",
    configName: "MoveBingoCardDisplay",
    title: "Move",
    description: "Move the Bingo Card Display.",
    subcategory: "Bingo Card Display",
    placeHolder: "Move",
    onClick() {
        ChatLib.command('b+ move bingoCardDisplay', true)
    }
})

.addSwitch({
    category: "Bingo",
    configName: "bingoTimerDisplay",
    title: "Bingo Timer",
    description: "Displays time until a Bingo starts, ends, and profile deletion.",
    subcategory: "Bingo Timer Display",
})
.addSwitch({
    category: "Bingo",
    configName: "bingoTimerDisplayDontRound",
    title: "Don't round",
    description: "Leaves the time as day:hour:minute:second and doesn't round.",
    subcategory: "Bingo Timer Display",
    shouldShow: data => data.bingoTimerDisplay
})
.addSwitch({
    category: "Bingo",
    configName: "bingoTimerDisplayEverywhere",
    title: "Show timer everywhere",
    description: "Shows timer while not on a Bingo profile.",
    subcategory: "Bingo Timer Display",
    shouldShow: data => data.bingoTimerDisplay
})
.addButton({
    category: "Bingo",
    configName: "MoveBingoTimerDisplay",
    title: "Move",
    description: "Move the Bingo Timer Display.",
    subcategory: "Bingo Timer Display",
    placeHolder: "Move",
    onClick() {
        ChatLib.command('b+ move bingoTimerDisplay', true)
    },
    shouldShow: data => data.bingoTimerDisplay
})

.addSwitch({
    category: "Bingo",
    configName: "accurateBingoPlaytime",
    title: "Accurate playtime",
    description: "Shows a more accurate Bingo playtime by measuring each second. Use &a/playtime &rto view.\n&cYou should preferably have this feature enabled before creating your Bingo profile for the most accurate time!",
    subcategory: "Playtime"
})

// Other

.addSwitch({
    category: "Other",
    configName: "chickenHeadTimer",
    title: "Chicken Head Timer",
    description: "Displays a timer for the Chicken Head cooldown.",
    subcategory: "Chicken Head Timer",
    value: true
})
.addButton({
    category: "Other",
    configName: "MoveChickenHeadTimer",
    title: "Move",
    description: "Move the Chicken Head Timer.",
    subcategory: "Chicken Head Timer",
    placeHolder: "Move",
    onClick() {
        ChatLib.command('b+ move chickenHeadTimerDisplay', true)
    }
})
.addSwitch({
    category: "Other",
    configName: "hideEggLaidMessage",
    title: "Hide Egg Laid Message",
    description: "Hides the §r§aYou laid an egg!§r message.",
    subcategory: "Chicken Head Timer"
})

.addSwitch({
    category: "Other",
    configName: "windCompassDisplay",
    title: "Wind Compass Display",
    description: "Shows a display with the wind compass during the 'Gone with the Wind' event.",
    subcategory: "Gone with the Wind"
})
.addButton({
    category: "Other",
    configName: "MoveWindCompassDisplay",
    title: "Move",
    description: "Move the Wind Compass Display.",
    subcategory: "Gone with the Wind",
    placeHolder: "Move",
    onClick() {
        ChatLib.command('b+ move chickenHeadTimerDisplay', true)
    }
})

.addSwitch({
    category: "Other",
    configName: "puzzlerSolver",
    title: "Puzzler solver",
    description: "Solves the Puzzler's riddle in the Dwarven Mines.",
    subcategory: "Puzzler",
    value: true
})

.addSwitch({
    category: "Other",
    configName: "ratWaypoints",
    title: "Rat Waypoints",
    description: "Shows waypoints for the general location of Rat spawns.\n&aToggleable with &6/rats&a.",
    subcategory: "Rats",
})
.addSwitch({
    category: "Other",
    configName: "ratWaypointsShowText",
    title: "Show text",
    description: "Shows text next to each waypoint with information on how to access it.",
    subcategory: "Rats",
    shouldShow: data => data.ratWaypoints,
    value: true
})
.addSwitch({
    category: "Other",
    configName: "ratWaypointsShowBeacon",
    title: "Show beacon",
    description: "Shows a beacon at each waypoint.",
    subcategory: "Rats",
    shouldShow: data => data.ratWaypoints,
    value: true
})

// Party

.addSwitch({
    category: "Party",
    configName: "blockPartyDiscordWarning",
    title: "Block Discord warning",
    description: "Blocks the red text under a message containing the word 'discord'.",
    subcategory: "Message Blockers"
})
.addDropDown({
    category: "Party",
    configName: "blockPartyLineBreak",
    title: "Block Party Line Breaks",
    description: "Blocks the blue separator line.\nRecommended if using the other blockers!",
    options: ["Off", "Block while in BingoParty", "Block everywhere"],
    subcategory: "Message Blockers",
    value: 0
})
.addDropDown({
    category: "Party",
    configName: "blockPartyTravelMessagesNew",
    title: "Block Party Travel Notifications",
    description: "Blocks party travel notifications.\n&8Instead of using 'Everywhere' consider disabling Co-op Travel Notifications in SkyBlock settings!",
    options: ["Off", "Block while in BingoParty", "Block everywhere"],
    subcategory: "Message Blockers",
    value: 0
})
.addDropDown({
    category: "Party",
    configName: "blockPartyJoinLeave",
    title: "Block Join/Leave",
    description: "Blocks party join/leave messages. This includes the 5 minute disconnect messages.",
    options: ["Off", "Block while in BingoParty", "Block everywhere"],
    subcategory: "Message Blockers",
    value: 0
})

.addButton({
    category: "Party",
    configName: "openBingoPartyDocumentation",
    title: "BingoParty Commands Documentation",
    description: "A guide on the available §6[MVP§r§c++§r§6] BingoParty§r commands.",
    subcategory: "BingoParty Moderation",
    placeHolder: "GitHub",
    onClick() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL(
            'https://github.com/aphased/BingoPartyCommands?tab=readme-ov-file#bingopartycommands'
        ).toURI())
    }
})
.addTextInput({
    category: "Party",
    configName: "bingoPartyAlias",
    title: "Alias for /msg BingoParty !p",
    description: "Creates an alias for &6/msg BingoParty !p&r. Leave blank to disable.\nExample: &aap&r\n&cRun /ct load after changing alias!",
    subcategory: "BingoParty Moderation",
    placeHolder: "eg. ap",
    value: "",
})
/*
.addSwitch({
    category: "Party",
    configName: "bingoPartyCommandConverter",
    title: "Command converter",
    description: "While in §6[MVP§r§c++§r§6] BingoParty§r's party, convert /p commands to its commands.",
    subcategory: "BingoParty Moderation"
})
*/

// Splasher

.addSwitch({
    category: "Splasher",
    configName: "potionAbbreviation",
    title: "Show potion abbreviation",
    description: "Renders the potion's abbreviation over it",
    subcategory: "Potions",
    value: true
})

.addSwitch({
    category: "Splasher",
    configName: "splasherDisplay",
    title: "Splasher Display",
    description: "Show a display with important information while in the Pet Care area.",
    subcategory: "Splasher Display",
    value: true
})
.addSwitch({
    category: "Splasher",
    configName: "splasherDisplayEverywhere",
    title: "Show everywhere",
    description: "Show the display everywhere.\n&cMay break in unsupported areas!",
    subcategory: "Splasher Display",
    shouldShow: data => data.splasherDisplay
})
.addSwitch({
    category: "Splasher",
    configName: "splasherDisplayOnlyShowDuringBingo",
    title: "Only show during Bingo",
    description: "Only shows the display during a Bingo event",
    subcategory: "Splasher Display",
    shouldShow: data => data.splasherDisplay
})
.addSlider({
    category: "Splasher",
    configName: "splasherDisplayDistance",
    title: "Splasher Display Distance",
    description: "Detect players until this distance.\n&a5 is recommended",
    subcategory: "Splasher Display",
    shouldShow: data => data.splasherDisplay,
    options: [1, 10],
    value: 5,
})
.addButton({
    category: "Splasher",
    configName: "MoveSplasherDisplay",
    title: "Move",
    description: "Move the Splasher Display",
    subcategory: "Splasher Display",
    placeHolder: "Move",
    onClick() {
        ChatLib.command('b+ move splasherDisplay', true)
    }
})

.addSwitch({
    category: "Splasher",
    configName: "noPotionsWarning",
    title: "No Potions Warning",
    description: "Warns you if you enter the Pet Care in a mega hub without any splash potions.\n&cthis doesn't work correctly rn i think",
    subcategory: "Potions"
})

.addSwitch({
    category: "Splasher",
    configName: "hubSelectorDisplay",
    title: "Hub Selector Display",
    description: "Show a display with the lowest player hubs while in the Hub Selector.",
    subcategory: "Hub Selector"
})
.addSlider({
    category: "Splasher",
    configName: "hubSelectorDisplayTopHubs",
    title: "Top Hubs",
    description: "How many hubs to show",
    subcategory: "Hub Selector",
    shouldShow: data => data.hubSelectorDisplay,
    options: [1, 28],
    value: 5
})
.addButton({
    category: "Splasher",
    configName: "MoveHubSelectorDisplay",
    title: "Move",
    description: "Move the Lowest Hub Display",
    subcategory: "Hub Selector",
    placeHolder: "Move",
    onClick() {
        ChatLib.chat(`${constants.PREFIX}This feature can currently only be moved within the Hub Selector menu.`)
    }
})
.addSwitch({
    category: "Splasher",
    configName: "hubRestartWarning",
    title: "Hub Restart Warning",
    description: "Sends a message in chat if a restarting hub is detected.\nHub numbers may be shifting when this happens.",
    subcategory: "Hub Selector",
    shouldShow: data => data.hubSelectorDisplay
})
.addSwitch({
    category: "Splasher",
    configName: "hubSelectorHighlightBestHubs",
    title: "Highlight Best Hubs",
    description: "Highlights the hubs with the lowest playercount.\n&8Disable SBE's Hub Colors for the best experience!",
    subcategory: "Hub Selector",
    shouldShow: data => data.hubSelectorDisplay
})

// Chat

.addSwitch({
    category: "Chat",
    configName: "oringoAbiphoneCost",
    title: "Oringo Abiphone Cost",
    description: "Convert Oringo's Abiphone message to include the rarity and cost of each pet.",
    subcategory: "Oringo",
    value: true
})
.addSwitch({
    category: "Chat",
    configName: "oringoDiscordCopy",
    title: "Copy as Discord message",
    description: "Also automatically copy this message to send in Discord.",
    subcategory: "Oringo",
    shouldShow: data => data.oringoAbiphoneCost,
    value: true
})

// Commands

.addTextInput({
    category: "Commands",
    configName: "centuryCakeIsland",
    title: "Century Cake Island",
    description: "Visits a Cake Hub when running &e/cake&r.\nDefault: &aBingoSplasher&r",
    value: "BingoSplasher",
    placeHolder: "username",
    subcategory: ""
})

const settings = new FuckYouIWantToUseThatName("BingoPlus", config, "data/vigilanceScheme.json", `${constants.PREFIX}&bv${version} &aby &dooffyy`)
    .setSize(80, 80)
    .setPos(10, 10)
    .setCategorySort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
    .apply()

export default () => settings.settings