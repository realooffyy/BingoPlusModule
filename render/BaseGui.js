// thanks coleweight

import { data } from "../utils/constants"
import { registerWhen } from "../utils/utils"

export class BaseGui {

    /**
     * @param {string[]} guiData - The data alias in the PogData
     * @param {string[]} alias - Aliases for this gui
     * @param {boolean} draggable - Can be draggable without entering the move gui
     */

    constructor(guiData, aliases) {
        this.guiData = guiData
        this.aliases = aliases
        this.gui = new Gui()
    
        register("dragged", (dx, dy, x, y) => {
            if (!this.gui.isOpen()) return
            data[guiData].x = x
            data[guiData].y = y
            data.save()
        })

        registerWhen(register("renderOverlay", () => {
            if (this.gui.isOpen()) {
                let txt = "Drag to move. Use +/- to increase/decrease gui size."
                Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2)
                txt = `scale: ${data[guiData].scale}`
                Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2 + 15)
                txt = `x: ${Math.round(data[guiData].x)}, y: ${Math.round(data[guiData].y)}`
                Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2 + 30)

            }
        }), () => this.gui.isOpen())

        register("guiKey", (char, keyCode, gui, event) => {
            if (!this.gui.isOpen()) return

            if (keyCode == 13)
                data[guiData].scale = (Number(data[guiData].scale) + 0.05).toFixed(2)
            else if (keyCode == 12)
                data[guiData].scale = (data[guiData].scale - 0.05).toFixed(2)
            
            else if (keyCode == 200) // up
                data[guiData].y -= 1
            else if (keyCode == 208) // down
                data[guiData].y += 1
            else if (keyCode == 203) // left
                data[guiData].x -= 1
            else if (keyCode == 205) // right
                data[guiData].x += 1

            data.save()
        })
    }

    isOpen()
    {
        return this.gui.isOpen()
    }

    open()
    {
        return this.gui.open()
    }

}
