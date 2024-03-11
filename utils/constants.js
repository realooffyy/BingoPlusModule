import PogObject from "../../PogData/index"

export default constants = {
    PREFIX: "&6[&6Bingo&c+&6]&r ",
    COMMANDS_LIST: [
        `&6/b+ &8- Opens Bingo+ config`,
        `&7/cake &8- Visits a Cake Hub. Defaults to BingoSplasher, configurable in settings`,
        `&7/skycrypt <player> [fruit] &8- Provides a user's SkyCrypt link`
    ]
}

export const data = new PogObject("Bingo+", {
    firstTime: true,
    
    chickenHeadTimerDisplay: {
        x: 280,
        y: 30,
        scale: 1
    },
    communityGoalDisplay: {
        x: 5,
        y: 90,
        scale: 1
    }
}, "config/data.json")
