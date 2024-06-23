/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import Settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import Bingo from "../../utils/Bingo"
import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import { registerWhen, removeUnicode } from "../../utils/utils"

let communityGoalDisplayGui = new BaseGui('communityGoalDisplay', ['communityGoalDisplay', 'communitygoal', 'communitygoals', 'community'])
registerGui(communityGoalDisplayGui)

const baseText = 'Loading Community Goal data...'

let opened = false
let lines = 'Loading Community Goal data...'

const baseWidth = 150
const baseHeight = 118

register("tick", (t) => {
    opened = (Bingo.cardOpened && Settings.communityGoalDisplay) || communityGoalDisplayGui.isOpen()
    if (t%10 || !Skyblock.inSkyblock || !Settings.communityGoalDisplay) return
    if (Bingo.community !== null) {
        if (Bingo.community.length == 5 && Bingo.cardOpened) compileLines()
    }
    if (!Bingo.cardOpened) lines = baseText
})

registerWhen(register('renderOverlay', () => { // render
    const guiX = data.communityGoalDisplay.x
    const guiY = data.communityGoalDisplay.y
    const scale = data.communityGoalDisplay.scale
    const width = baseWidth * scale
    const height = baseHeight * scale

    const rectangle = new Rectangle(Renderer.color(0, 0, 0, 80), guiX, guiY, width, height)
    rectangle.draw()

    Renderer.translate(guiX+5, guiY+5, 999)
    Renderer.scale(scale)
    Renderer.drawStringWithShadow(lines, 0, 0)
}), () => opened)


function compileLines() {
    lines = '&6&lCommunity Goals&r\n\n'
    Bingo.community.forEach(goal => {
        lines += `  &a✔ ${goal.name}\n\n` // title
    })
    //display?.addLine(`${list.name}`) // title
    //display?.addLine('') // empty
    //for (let i = 0; i < 5; i++) {
        //display?.addLine(`  &a✔ ${list.goals[i][0]}`) // goal title
        //display?.addLine(` ${list.goals[i][1]} ${list.goals[i][2]}`) // goal contrib
    //}
}
