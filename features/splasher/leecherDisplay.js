import { data } from "../../utils/constants"
import settings from "../../settings"

import { registerWhen, getTabList, getValue } from "../../utils/utils"
import Skyblock from "../../utils/Skyblock"

let opened = false

let lines = ''

let total = 0
let enjoyers = 0
let ironman = []
let leechers = []

let width = 120
let height = 1

let guiX, guiY, grabX, grabY
let changePos = false

register("step", () => {
    guiX = data.leecherDisplay.x
    guiY = data.leecherDisplay.y

    opened = false
    if (!settings.leecher_display || !Skyblock.inSkyblock) return
    if (settings.leecher_display_everywhere || Skyblock.subArea === 'Pet Care' || settings.leecherDisplayMove.isOpen()) {
        opened = true
    }
})

register("step", () => {

    if (opened) {
        
        lines = ''
        total = 0
        enjoyers = 0
        
        const allPlayers = World.getAllPlayers()
        ironman = []
        leechers = []

        x = Player.getX()
        y = Player.getY()
        z = Player.getZ()
        
        allPlayers.forEach(user => {
            if (user.getUUID().version() === 4) {
                if (Math.hypot(x - user.x, y - user.y, z - user.z) < 5) { // thanks doc
                    name = user.getDisplayName().text

                    if (name.includes('Ⓑ')) { enjoyers += 1 }
                    else if (name.includes('♲')) { ironman.push(name) }
                    else { leechers.push(name) }
                }
            }
        })
        let lobbyMax = '??'
        let lobbyCount = '??'
        if (Skyblock.area === 'Hub') lobbyMax = 80
        if (Skyblock.area === 'Dungeon Hub') lobbyMax = 24

        let regex = /.*Players \((\d{1,2})\)/
        let tabLine = getTabList()[0]
        //if (regex.test(tabLine)) 
        lobbyCount = getValue(tabLine, regex, '??')

        if (lobbyCount >= lobbyMax) lobbyCount = `&c&l${lobbyCount}`
        else lobbyCount = `&7&l${lobbyCount}`
        
        lines += `&6&lEnjoyers: ${enjoyers}&r\n`;
        lines += `${lobbyCount}&8/${lobbyMax}&r\n\n`
        lines += `&7&l♲ Ironman:&r\n${ironman.join('\n')}\n`;
        lines += `&c&lLeechers:&r\n${leechers.join('\n')}\n`;

    }
}).setFps(1)

const renderPlayers = () => {
    height = 10+(lines.replace(/[^\n]/g, "").length)*9
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
