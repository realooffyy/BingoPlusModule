import PogObject from "../../PogData/index"

export default constants = {
    PREFIX: "&6[&6Bingo&c+&6]&r ",
    DISCORD: "https://discord.gg/P8rahWWA7b",
    COMMANDS_LIST: [
        `&6/b+ &8- Opens Bingo+ config`,
        `&7/cake &8- Visits a Cake Hub. Defaults to BingoSplasher, configurable in settings`
    ],
    BINGOPARTY_IGN: "BingoParty",

    SPLASHMESSAGE_FOLDER: "/data/Splash Message/",
    SPLASHMESSAGE_FILE: "message.txt"
}

export const data = new PogObject("BingoPlus", {
    firstTime: true,
    dev: false,

    bingoApiOn: true,
    bingoApi: {
        id: null,
        lastUpdated: null,
        name: null,
        modifier: null,
        start: null,
        end: null,

        goals: null
    },

    bingoPlaytimeStart: null,
    bingoPlaytime: 0,

    allGoals: [],

    chickenHeadTimerDisplay: {
        x: 280,
        y: 30,
        scale: 1
    },
    communityGoalDisplay: {
        x: 5,
        y: 90,
        scale: 1
    },
    splasherDisplay: {
        x: 10,
        y: 10,
        scale: 1
    },
    hubSelectorDisplay: {
        x: 10,
        y: 10,
        scale: 1
    },
    bingoCardDisplay: {
        x: 10,
        y: 10,
        scale: 1
    },
    bingoTimerDisplay: {
        x: 10,
        y: 10,
        scale: 1
    },
    windCompassDisplay: {
        x: Renderer.screen.getWidth()/2,
        y: Renderer.screen.getHeight()/2,
        scale: 2
    },
    moduleData: {
        version: 2,
        bingoParty: {
            botIGN: "BingoParty",
            allowList: [ // v2
                "disband",
                "transfer",
                "unmute",
                "mute",
                "pro",
                "prom",
                "promo",
                "promote",
                "testcommand",
                "testpermissions",
                "testperms",
                "test",
                "ka",
                "ko",
                "kickafk",
                "kickoffline",
                "remove",
                "kick",
                "block",
                "ban",
                "unblock",
                "unban",
                "close",
                "open",
                "public",
                "stream",
                "inv",
                "invite",
                "allinvite",
                "speak",
                "say",
                "rep",
                "repeat",
                "crep",
                "crepeat",
                "customrep",
                "customrepeat",
                "flea",
                "bf",
                "pl",
                "size",
                "lsbanned",
                "printallowed",
                "printAllowlist",
                "lsallowed",
                "rule",
                "poll",
                "publicguide",
                "g",
                "gd",
                "guide",
                "sg",
                "setguide",
                "help",
                "sendlimbo",
                "limbo",
                "addSplasher",
                "add",
                "removeSplasher",
                "cmd",
                "disable",
                "disableall",
                "enable",
                "enableall",
                "lstoggled",
                "lsdisabled",
                "printdeactivated",
                "printdisabled",
                "printDisabled",
                "query"
            ]
        }
    }

}, "data/data.json")

export const rats = [
    [-6, 69, 2, 'under mountain'], // house under mountain
    [27, 66, -24, 'back here'], // behind fashion house
    [46, 69, -37, 'inside or behind thaumaturgist house'], // thaumaturgist house
    [4, 71, -98, 'community house or outside in the bushes'], // community house
    [-34, 57, -90, 'auction house basement'], // auction house basement
    [43, 72, -162, 'farm house'], // farm house
    [-36, 57, -117, 'hexatorium basement'], // why does this exist 💀
    [19, 61, -4, 'furniture shop basement'], // furniture shop basement
]

export const colourMap = {
    '4': [170, 0, 0],    // Dark Red
    'c': [255, 85, 85],  // Red
    '6': [255, 170, 0],  // Gold
    'e': [255, 255, 85], // Yellow
    '2': [0, 170, 0],    // Dark Green
    'a': [85, 255, 85],  // Green
    'b': [85, 255, 255], // Aqua
    '3': [0, 170, 170],  // Dark Aqua
    '1': [0, 0, 170],    // Dark Blue
    '9': [85, 85, 255],  // Blue
    'd': [255, 85, 255], // Light Purple
    '5': [170, 0, 170],  // Dark Purple
    'f': [255, 255, 255], // White
    '7': [170, 170, 170], // Gray
    '8': [85, 85, 85],   // Dark Gray
    '0': [0, 0, 0]       // Black
}

/*
export const goalSlots = {
    personal: [3, 4, 5, 6,
            11, 13, 14, 15,
            20, 21, 23, 24,
            29, 30, 31, 33,
            38, 39, 40, 41],
    community: [2, 12, 22, 32, 42],
    all: [2, 3, 4, 5, 6,
        11, 12, 13, 14, 15,
        20, 21, 22, 23, 24,
        29, 30, 31, 32, 33,
        38, 39, 40, 41, 42]
}
*/