import FuckYouIWantToUseThatName from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import constants from "./utils/constants"
import Party from "./utils/Party"

const categories = ["General", "Bingo", "Other", "Party", "Splasher", "Chat", "Commands", "Dev"]
const version = JSON.parse(FileLib.read("BingoPlus", "metadata.json")).version

const config = new DefaultConfig("BingoPlus", "data/settings.json")

// General

.addButton({
    category: "General",
    subcategory: "Bingo Commands",
    configName: "runBingoCommand",
    title: "/bingo",
    description: "",
    placeHolder: "/bingo",
    onClick() {
        Client.currentGui.close()
        ChatLib.command('bingo')
    }
})
.addButton({
    category: "General",
    subcategory: "Bingo Commands",
    configName: "runBingoPartyJoinCommand",
    title: "Join Bingo Party",
    description: "",
    placeHolder: "BingoParty",
    onClick() {
        Client.currentGui.close()
        ChatLib.command(`p join ${Party.getBotIGN()}`)
    }
})
.addButton({
    category: "General",
    subcategory: "Discord",
    configName: "joinDiscord",
    title: "Join the Discord",
    description: "",
    placeHolder: "Discord",
    onClick() {
        try {
            java.awt.Desktop.getDesktop().browse(new java.net.URL(constants.DISCORD).toURI())
        } catch (err) {
            ChatLib.command(`ct copy ${constants.DISCORD}`, true)
            ChatLib.chat(`${constants.PREFIX}&aCopied Discord link to clipboard!`)
        }
    } // AVOID NOAMM9 AT ALL COSTS
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
        ChatLib.command('b+ move windCompassDisplay', true)
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
/* TODO: implement the text thing again
.addSwitch({
    category: "Other",
    configName: "ratWaypointsShowText",
    title: "Show text",
    description: "Shows text next to each waypoint with information on how to access it.",
    subcategory: "Rats",
    shouldShow: data => data.ratWaypoints,
    value: true
})
*/
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
    options: ["Off", "Block while in Bingo Party", "Block everywhere"],
    subcategory: "Message Blockers",
    value: 0
})
.addDropDown({
    category: "Party",
    configName: "blockPartyTravelMessagesNew",
    title: "Block Party Travel Notifications",
    description: "Blocks party travel notifications.\n&8Instead of using 'Everywhere' consider disabling Co-op Travel Notifications in SkyBlock settings!",
    options: ["Off", "Block while in Bingo Party", "Block everywhere"],
    subcategory: "Message Blockers",
    value: 0
})
.addDropDown({
    category: "Party",
    configName: "blockPartyJoinLeave",
    title: "Block Join/Leave",
    description: "Blocks party join/leave messages. This includes the 5 minute disconnect messages.",
    options: ["Off", "Block while in Bingo Party", "Block everywhere"],
    subcategory: "Message Blockers",
    value: 0
})

.addTextParagraph({
    category: "Party",
    configName: "bingoPartyBotInfo",
    title: "BingoPartyBot",
    description: "BingoPartyBot is a project allowing for controlling the Bingo Party without being a party leader.\n&cThis section is intended for Bingo Brewers splashers and other trusted individuals!",
    subcategory: "BingoParty Moderation"
})
.addButton({
    category: "Party",
    configName: "openBingoPartyDocumentation",
    title: "Bingo Party",
    description: "Click to see the available Bingo Party commands",
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
    title: "Alias for Bingo Party commands",
    description: "Creates an alias for messaging the Bingo Party. Leave blank to disable. Supports some autocomplete :P\nExample: &aap&r\n&cRun /ct load after changing alias!",
    subcategory: "BingoParty Moderation",
    placeHolder: "eg. ap",
    value: "",
})
.addSwitch({
    category: "Party",
    configName: "bingoPartyCommandConverter",
    title: "Command converter",
    description: "While in the Bingo Party, convert /p commands to the Bingo Party equivalent.",
    subcategory: "BingoParty Moderation"
})
.addSwitch({
    category: "Party",
    configName: "bingoPartyCommandRandomString",
    title: "Also add a random string to the end",
    description: "Adds a random string to the end of most Bingo Party commands to bypass saying the same message twice.",
    subcategory: "BingoParty Moderation",
    value: true
})

.addSwitch({
    category: "Party",
    configName: "partyCustomStreamCommands",
    title: "(coming soon) Custom stream commands",
    description: "Custom commands to improve your public party management. Run &a/b+ stream &rfor a list.",
    subcategory: "Commands"
})

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
    configName: "brewingStandLoadedBox",
    title: "Colour Brewing Stands",
    description: "Colours brewing stands if they are loaded\n&cDisable Skytils' 'Color Brewing Stands' feature!",
    subcategory: "Brewing Stands",
})
.addColorPicker({
    category: "Splasher",
    configName: "brewingStandLoadedColour",
    title: "Loaded colour",
    description: "Default colour when a brewing stand is loaded",
    subcategory: "Brewing Stands",
    value: [0, 255, 0, 77]
})
.addColorPicker({
    category: "Splasher",
    configName: "brewingStandCurrentlyBrewingColour",
    title: "Currently brewing colour",
    description: "Colour when something is brewing",
    subcategory: "Brewing Stands",
    value: [255, 0, 0, 77]
})
.addSwitch({
    category: "Splasher",
    configName: "brewingStandHighlightCorrectBrew",
    title: "Highlight correct brews",
    description: "Highlights the correct brews to put in, based on the current ingredient.\n&cDesigned for God Splashes, may not work with other ingredients!",
    subcategory: "Brewing Stands"
})

// these are in hubSelector.js
.addDropDown({
    category: "Splasher",
    configName: "splashMessageCopyWhenClickingHub",
    title: "Copy splash message when clicked",
    description: "Copies a dynamic splash message when clicking on a hub in the Hub Selector",
    options: ["Off", "Auto copy", "Message in chat"],
    subcategory: "Splash Message",
    value: 1
})
.addButton({
    category: "Splasher",
    configName: "splashMessageOpenFolder",
    title: "Open folder",
    description: "Open the folder with the splash message files",
    subcategory: "Splash Message",
    onClick() {
        // TODO: make this function modular
        try {
            const currentScriptPath = new java.io.File(arguments[0]).getAbsolutePath()
            const currentDir = new java.io.File(currentScriptPath).getParent()

            const relativeFilePath = new java.io.File(currentDir, "config/ChatTriggers/modules/BingoPlus" +
                constants.SPLASHMESSAGE_FOLDER)

            if (java.awt.Desktop.isDesktopSupported()) {
                const desktop = java.awt.Desktop.getDesktop()
                if (desktop.isSupported(java.awt.Desktop.Action.OPEN)) {
                    const file = new java.io.File(relativeFilePath)
                    desktop.open(file)
                    return
                }
            }
        }
        catch (err) {
            ChatLib.chat(`${constants.PREFIX}&cSomething went wrong! &rRun &a/ct file &rand go to &amodules/BingoPlus/data/Splash Message &rinstead.\n\n"${err}"`)
            return
        }
        ChatLib.chat(`${constants.PREFIX}&cSomething went wrong! &rRun &a/ct file &rand go to &amodules/BingoPlus/data/Splash Message &rinstead.\n\n"${err}"`)


        
    }
})

.addSwitch({
    category: "Splasher",
    configName: "splasherDisplay",
    title: "Splasher Display",
    description: "Show a display with important information while in the Pet Care area.",
    subcategory: "Splasher Display"
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
    description: "Move the Hub Selector Display",
    subcategory: "Hub Selector",
    placeHolder: "Move",
    onClick() {
        ChatLib.command('b+ move hubSelectorDisplay', true)
    }
})
.addSwitch({
    category: "Splasher",
    configName: "hubRestartWarning",
    title: "Hub Restart Warning",
    description: "Sends a message in chat if a restarting hub is detected.\nHub numbers may be shifting when this happens.",
    subcategory: "Hub Selector"
})
.addSwitch({
    category: "Splasher",
    configName: "hubSelectorHighlightBestHubs",
    title: "Highlight Best Hubs",
    description: "Highlights the hubs with the lowest playercount.\n&8Disable SBE's Hub Colors for the best experience!",
    subcategory: "Hub Selector"
})
.addSwitch({
    category: "Splasher",
    configName: "hubSelectorWarnIfMega",
    title: "Warn if mega",
    description: "Warns the user if warping into a random mega hub. Useful for finding a private mega!",
    subcategory: "Hub Selector"
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
    subcategory: "Commands"
})

// Dev

.addTextParagraph({
    category: "Dev",
    configName: "devInfo",
    title: "Dev settings",
    description: "&cOnly change these settings if you know what you're doing! This may break some features.\nYou may need to run &a/ct load &rto apply changes.",
    subcategory: "Dev"
})

.addSwitch({
    category: "Dev",
    configName: "devBingoApi",
    title: "Bingo API",
    description: "Enables calling the Bingo API",
    subcategory: "API",
    value: true
})
.addSwitch({
    category: "Dev",
    configName: "devBingoPlusModuleData",
    title: "Github BingoPlusModule API",
    description: "Enables calling the BingoPlusModule API",
    subcategory: "API",
    value: true
})

const settings = new FuckYouIWantToUseThatName("BingoPlus", config, "data/vigilanceScheme.json", `${constants.PREFIX}&bv${version} &aby &dooffyy`)
    .setSize(80, 80)
    .setPos(10, 10)
    .setCategorySort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
    .onOpenGui(() => {
        settings.searchBar._focusSearch()
    })
    .apply()

export default () => settings.settings