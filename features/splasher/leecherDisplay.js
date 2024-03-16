import { data } from "../../utils/constants"
import settings from "../../settings"

import { registerWhen } from "../../utils/utils"
import skyblock from "../../utils/skyblock"

let lines = ''
let opened = false
let changePos = false

let enjoyers = 0
let ironman = []
let leechers = []

let width = 120
let height = 200

register("step", () => {
    opened = false
    if (!settings.leecher_display || !skyblock.inSkyblock) return
    if (!settings.leecher_display_everywhere && skyblock.subArea !== 'Pet Care') return
    opened = true
    lines = ''
    enjoyers = 0

    const allPlayers = World.getAllPlayers()
    ironman = []
    leechers = []

    x = Player.getX()
    y = Player.getY()
    z = Player.getZ()
    
    allPlayers.forEach(user => {
        if (Math.hypot(x - user.x, y - user.y, z - user.z) < 5) { // thanks doc
            if (user.getUUID().version() === 4) {
                name = user.getDisplayName().text

                if (name.includes('Ⓑ')) { enjoyers += 1 }
                else if (name.includes('♲')) { ironman.push(name) }
                else { leechers.push(name) }
            }
        }
    })
    lines += `&6&lEnjoyers: ${enjoyers}&r\n\n`;
    lines += `&7&l♲ Ironman:&r\n${ironman.join('\n')}\n`;
    lines += `&c&lLeechers:&r\n${leechers.join('\n')}\n`;

}).setFps(5)

//&r${user.isSpectator()}

const renderPlayers = () => {
    guiX = data.leecherDisplay.x
    guiY = data.leecherDisplay.y

    const rectangle = new Rectangle(Renderer.color(0, 0, 0, 50), guiX, guiY, width, height) // background
    rectangle.draw()

    Renderer.translate(guiX, guiY, 1000)
    Renderer.scale(data.leecherDisplay.scale ?? 1)
    
    Renderer.drawStringWithShadow(lines, 5, 5) // text

    Renderer.retainTransforms(false)
    Renderer.finishDraw()
}

registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!opened) return
    renderPlayers()
}), () => opened)


register("dragged", (dx, dy, x, y) => {
    if (changePos) {
        data.leecherDisplay.x = x-grabX-5
        data.leecherDisplay.y = y-grabY-5
        data.save()
    }
})

register("clicked", (x, y, btn, state) => {
    if (!opened) return
    if (state) {
        if ((x >= guiX && x <= guiX + width) &&
            (y >= guiY && y <= guiY + height)) {
            grabX = x-guiX-5
            grabY = y-guiY-5
            changePos = true
        } else {
            changePos = false
        }
    }
})
