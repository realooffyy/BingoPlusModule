/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import Settings from "../../Settings"
import Skyblock from "../../utils/Skyblock"
import Bingo from "../../utils/Bingo"
import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import { registerWhen, removeUnicode } from "../../utils/utils"

let communityGoalDisplayGui = new BaseGui('communityGoalDisplay', ['communityGoalDisplay', 'communitygoal', 'communitygoals', 'community'])
registerGui(communityGoalDisplayGui)

const baseText = 'Reading...'

let opened = false
let lines = baseText

const baseWidth = 100
const baseHeight = 118

let guiX = 0
let guiY = 0
let scale = 1
let height = baseHeight
let width = baseWidth

register("tick", (t) => {
    opened = (Bingo.cardOpened && Settings.communityGoalDisplay)
    if (!Bingo.cardOpened) lines = baseText
    if (t%10 || !Skyblock.inSkyblock || !Settings.communityGoalDisplay) return
    if (Bingo.community !== null) {
        if (Bingo.community.length == 5 && Bingo.cardOpened) {
            compileLines()
            calcWidth()
        }
    }
})

registerWhen(register('guiRender', () => { // rendering
    rendering(lines)
}), () => opened)

registerWhen(register('renderOverlay', () => { // settings rendering
    rendering('&6&lCommunity Goals&r')
}), () => communityGoalDisplayGui.isOpen())

/**
 * draws the stuff
 * @param {String} - the string to render
 */
function rendering(text) {
    guiX = data.communityGoalDisplay.x
    guiY = data.communityGoalDisplay.y
    scale = data.communityGoalDisplay.scale
    height = baseHeight * scale

    const rectangle = new Rectangle(Renderer.color(0, 0, 0, 80), guiX, guiY, width, height)
    rectangle.draw()

    Renderer.translate(guiX+5, guiY+5)
    Renderer.scale(scale)
    Renderer.drawStringWithShadow(text, 0, 0)
}

function compileLines() {
    lines = '&6&lCommunity Goals&r\n'
    Bingo.community.forEach(goal => {
        lines += `\n  &a✔ ${goal.name}\n      ${goal.contributionLine} &f`
        if (goal.rank) lines += `(&6&l#${goal.rank} &fContributor)`
        else if (goal.percent) lines += `&8(Top &${goal.percentColour}${goal.percent}%&8)&r`
    })
}

function calcWidth() {
    width = 100
    lines.split('\n').forEach(x => {
        const lineWidth = Renderer.getStringWidth(x)
        if (width < lineWidth) width = (lineWidth + 10) * scale 
    })
}