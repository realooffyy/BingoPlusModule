import PogObject from "../../PogData/index"

export default constants = {
    PREFIX: "&6[&6Bingo&c+&6]&r "
}

export const communityBingoPoints = [
    [1,3,4,5,7],
    []
]

export const data = new PogObject("Bingo+", {
    firstTime: true,
    
    chickenHeadTimerDisplay: {
        x: 0,
        y: 0,
        scale: 1
    },
    communityGoalDisplay: {
        x: 0,
        y: 0,
        scale: 1
    }
}, "config/data.json")
