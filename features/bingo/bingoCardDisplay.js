import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import settings from "../../settings"
import Bingo from "../../utils/Bingo"
import Skyblock from "../../utils/Skyblock"
import { data } from "../../utils/constants"
import { registerWhen } from "../../utils/utils"

const paper = new Item('minecraft:paper').setName('&a2nd Kyu')
const dye = new Item('minecraft:dye').setDamage(10)

const thick = 1.5
let len = 0

let x1=0, x2=0, y1=0, y2=0

let opened = false

let bingoCardGui = new BaseGui('bingoCardDisplay', ['bingoCardDisplay', 'bingoCard'])
registerGui(bingoCardGui)

register("tick", () => {
    opened = settings().bingoCardDisplay && Skyblock.inSkyblock && Bingo.inBingo || bingoCardGui.isOpen()
})

registerWhen(register('renderOverlay', () => {
    if (!opened) return

    x1 = data.bingoCardDisplay.x
    y1 = data.bingoCardDisplay.y
    let scale = data.bingoCardDisplay.scale

    // border
    len = 5*16*scale

    x2 = x1 + len
    y2 = y1 + len

    let bx1 = x1-5*scale
    let bx2 = x2+5*scale
    let by1 = y1-5*scale
    let by2 = y2+5*scale

    Renderer.drawLine(Renderer.WHITE, bx1, by1, bx2, by1, thick*scale)
    Renderer.drawLine(Renderer.WHITE, bx1, by2, bx2, by2, thick*scale)
    Renderer.drawLine(Renderer.WHITE, bx1, by1, bx1, by2, thick*scale)
    Renderer.drawLine(Renderer.WHITE, bx2, by1, bx2, by2, thick*scale)

    if (Bingo.goals < 25) {
        Renderer.scale(scale)
        Renderer.drawStringWithShadow('&cOpen Bingo Card!', x1/scale, y1/scale+20*scale)
        Renderer.finishDraw()
        return
    }

    // items
    let count = 0
    for (let i = 0; i<5; i++) {
        for (let j = 0; j<5; j++) {
            let item = Bingo.goals[count]
            if (!(item.getID() == 351 && item.getLore().includes('§5§o§aGOAL REACHED') && settings().hideCompletedBingoGoals)) item.draw(x1 + 16*j*scale, y1 + 16*i*scale, scale)
            count++
        }
    }
}), () => opened)

/*
bug: https://discord.com/channels/1163947833402085439/1304167016944504924
register("clicked", (x, y, btn, state) => {
    if (opened && !bingoCardGui.isOpen() && Bingo.goals < 25) {
        if (state) {
            if ((y <= y2 && y >= y1) &&
                (x <= x2 && x >= x1)) {
                ChatLib.command('bingo')
            }
        }
    }
})
*/