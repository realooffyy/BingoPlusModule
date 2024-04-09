import Settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { data } from "../../utils/constants"
import { registerWhen } from "../../utils/utils"

const paper = new Item('minecraft:paper')
const dye = new Item('minecraft:dye').setDamage(10)

const thick = 1.5
let len = 0

let opened = false

register("tick", () => {
    opened = Settings.bingoCardDisplay && Skyblock.inSkyblock || Settings.bingoCardDisplayMove.isOpen()
})

registerWhen(register('renderOverlay', () => {
    if (!opened) return

    let x1 = data.bingoCardDisplay.x
    let y1 = data.bingoCardDisplay.y
    let scale = data.bingoCardDisplay.scale

    // items
    for (let i = 0; i<5; i++) {
        for (let j = 0; j<5; j++) {
            paper.draw(x1 + 16*i*scale, y1 + 16*j*scale, scale)
        }
    }

    // border
    len = 5*16*scale

    let x2 = x1 + len
    let y2 = y1 + len

    let bx1 = x1-5*scale
    let bx2 = x2+5*scale
    let by1 = y1-5*scale
    let by2 = y2+5*scale

    Renderer.drawLine(Renderer.WHITE, bx1, by1, bx2, by1, thick)
    Renderer.drawLine(Renderer.WHITE, bx1, by2, bx2, by2, thick)
    Renderer.drawLine(Renderer.WHITE, bx1, by1, bx1, by2, thick)
    Renderer.drawLine(Renderer.WHITE, bx2, by1, bx2, by2, thick)
}), () => opened)

register("dragged", (dx, dy, x, y) => {
    if (Settings.bingoCardDisplayMove.isOpen()) {
        data.bingoCardDisplay.x = x
        data.bingoCardDisplay.y = y
        data.save()
    }  
})