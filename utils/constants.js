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

    bingoApiOn: true,
    bingoApi: {
        id: null,
        lastUpdated: null,
        name: null,
        modifier: null,
        start: null,
        end: null
    },
    
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
    }
    
}, "config/data.json")

export const rats = [
    [-6, 69, 2], // house under mountain
    [27, 66, -24], // behind fashion house
    [46, 69, -37], // thaumaturgist house
    [4, 71, -98], // community house
    [-34, 57, -90], // auction house basement
    [43, 72, -162], // farm house
    [-36, 57, -117], // hexatorium basement
]
