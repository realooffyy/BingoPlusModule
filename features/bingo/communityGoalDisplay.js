/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import Settings from "../../Settings"
import Skyblock from "../../utils/Skyblock"
import Bingo from "../../utils/Bingo"
import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import { registerWhen, removeUnicode } from "../../utils/utils"
import { getStringHeight, getStringWidth, drawTextBox } from "../../render/utils"

let communityGoalDisplayGui = new BaseGui('communityGoalDisplay', ['communityGoalDisplay', 'communitygoal', 'communitygoals', 'community'])
registerGui(communityGoalDisplayGui)

const baseText = 'Reading...'

let opened = false
let lines = baseText

const baseWidth = 100
const baseHeight = 118

let height = baseHeight
let width = baseWidth

register("tick", () => {
    opened = (Skyblock.inSkyblock && Bingo.cardLoaded && Settings.communityGoalDisplay)
    if (!Bingo.cardLoaded) lines = baseText
    if (Bingo.community !== null) {
        if (Bingo.community.length == 5 && Bingo.cardLoaded && !this.communityGoalDisplayLinesUpdated) {
            compileLines()
            Bingo.communityGoalDisplayLinesUpdated = true
        }
    }
})

registerWhen(register('guiRender', () => { // rendering
    drawTextBox(lines, 'communityGoalDisplay', height, width)
}), () => opened)

registerWhen(register('renderOverlay', () => { // settings rendering
    drawTextBox('&6&lCommunity Goals&r', 'communityGoalDisplay')
}), () => communityGoalDisplayGui.isOpen())

function compileLines() {
    lines = '&6&lCommunity Goals&r\n'
    Bingo.community.forEach(goal => {
        lines += `\n  &a✔ ${goal.name}\n      ${goal.contributionLine} &f`
        if (goal.rank) lines += `(&6&l#${goal.rank} &fContributor)`
        else if (goal.percent) lines += `&8(Top &${goal.percentColour}${goal.percent}%&8)&r`
    })

    width = getStringWidth(lines)
    height = getStringHeight(lines)
}