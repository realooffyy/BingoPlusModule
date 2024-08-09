import RenderLib from "../../../RenderLib"
import settings from "../../settings"
import constants from "../../utils/constants"
import { registerWhen } from "../../utils/utils"

const origin = {
    x: 181,
    y: 195,
    z: 135
}

let loc
let showSolution = false

// reset everything
register("worldLoad", () => { 
    showSolution = false
}) 
register("chat", () => {
    showSolution = false
}).setCriteria('[NPC] Puzzler: ▶▶Nice!  ▲Here, ◀have ▼some◀ ▶Mithril Powder!▲')


// the actual solver
register("chat", (puzzle) => {
    if (!settings().puzzlerSolver) return
    loc = { ...origin }
    for (let char of puzzle) {
        console.log(char)
        if (char === '▲') loc.z += 1
        else if (char === '▼') loc.z -= 1
        else if (char === '◀') loc.x += 1
        else if (char === '▶') loc.x -= 1
        else {
            ChatLib.chat(`${constants.PREFIX}&cError reading puzzler text`)
        } 
    }
    showSolution = true

}).setCriteria(/^\[NPC\] Puzzler: ([▲▼◀▶]{10})$/)

// draw the box
registerWhen(register("renderWorld", () => { 
    RenderLib.drawInnerEspBox(loc.x+.5, loc.y+1.001, loc.z+.5, 1, 0.1, 0, 1, 0, 0.2, false)
}), () => showSolution)