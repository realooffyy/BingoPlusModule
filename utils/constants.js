import PogObject from "../../PogData/index"

export default constants = {
    PREFIX: "&6[&6Bingo&c+&6]&r ",
    DISCORD: "https://discord.gg/P8rahWWA7b",
    COMMANDS_LIST: [
        `&6/b+ &8- Opens Bingo+ config`,
        `&7/cake &8- Visits a Cake Hub. Defaults to BingoSplasher, configurable in settings`
    ]
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
    }

    
}, "config/data.json")

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