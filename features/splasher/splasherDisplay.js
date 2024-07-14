import { data } from "../../utils/constants"
import constants from "../../utils/constants"
import Settings from "../../Settings"
import { registerWhen, getTabList, getScoreboard, getValue, removeUnicode } from "../../utils/utils"
import Skyblock from "../../utils/Skyblock"
import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"

const playersTabRegex = /.*Players \((\d{1,2})\)/
const playersBoardRegex = /  \((\d{1,2})\/(\d{1,2})\).*/
// https://regex101.com/r/FxwnGL/1

let opened = false

let lines = ''

let enjoyers = 0
let ironman = []
let leechers = []

const base_width = 150
let width = 1
let height = 1

let splasherGui = new BaseGui('splasherDisplay', ['splasherDisplay', 'splasher', 'splashing'])
registerGui(splasherGui)

register("tick", () => { // opened and location manager
    if (!Settings.splasherDisplay || !Skyblock.inSkyblock) return
    opened = Skyblock.subArea === 'Pet Care' || Settings.splasherDisplayEverywhere || splasherGui.isOpen()
})

/*
register("chat", (msg) => {
    hubNumber = msg
}).setCriteria(/Request join for Hub #(\d{1,2}) \(.*\).../)
// https://regex101.com/r/WQx3UY/1
*/

register("step", () => { // line constructor
    if (opened) {
        lines = ''
        total = 0
        enjoyers = 0
        ironman = []
        leechers = []

        const { x, y, z } = Player

        const selfName = Player?.getName()

        // put everyone in the lists
        const nearbyPlayers = World.getAllPlayers().filter(player => player.getUUID().version() === 4 && Math.hypot(x - player.x, y - player.y, z - player.z) < Settings.splasherDisplayDistance)

        nearbyPlayers.forEach(user => {
            const name = user.getDisplayName().text
            if (user.getName() !== selfName) {
                if (name.includes('Ⓑ')) enjoyers++
                else if (name.includes('♲')) ironman.push(name)
                else leechers.push(name)
            }
        })

        const area = Skyblock.area
        const server = Skyblock.server
        const serverType = Skyblock.serverType
        const subArea = Skyblock.subArea

        // player count 
        let playerMax = null
        let playerCount = null
        if (area === 'Hub') {
            if (serverType === 'M') playerMax = 80
            else if (serverType === 'm') playerMax = 24
        }
        else if (area === 'Dungeon Hub') playerMax = 24

        else if (area?.includes('Private Island')) {
            getScoreboard().forEach(x => {
                let line = removeUnicode(x)
                if (playersBoardRegex.test(line)) {
                    let match = playersBoardRegex.exec(line)
                    if (match) {
                        playerCount = parseInt(match[1])
                        playerMax = parseInt(match[2])
                    } else {
                        playerCount = null;
                        playerMax = null;
                    }
                }
            })
        }

        const tabLine = removeUnicode(getTabList()[0])
        if (tabLine !== null) {
            if (playersTabRegex.test(tabLine)) playerCount = getValue(tabLine, playersTabRegex, '??')
        }

        let playerLine = ''
        let slotsLeft = playerMax-playerCount
        if (playerCount === null | playerMax === null) playerLine = null
        else if (slotsLeft > 0) { 
            let s = slotsLeft == 1 ? '' : 's'
            playerLine = `&e&l${slotsLeft} &eslot${s} left &8(&7${playerCount}&8/${playerMax})`
        }
        else playerLine = `&c&lFull! &8(&c${playerCount}&8/${playerMax})`


        lines += `&2&lHub Info&r\n`
        //lines += ` &3Hub ${hubNumber}\n`
        if (playerLine) lines += ` ${playerLine}&r\n`
        if (subArea) {
            if (subArea !== 'None') lines += ` &7⏣ &b${subArea}&r\n`
        }
        if (Skyblock.server) lines += ` &7${Skyblock.server}&r\n`
        
        lines += '\n'

        if (enjoyers > 0) lines += `&6&lEnjoyers: ${enjoyers}&r\n\n`
        if (ironman.length) lines += `&7&l♲ Ironman:&r\n ${ironman.join('\n ')}\n`
        if (leechers.length) lines += `&c&lൠ Leechers:&r\n ${leechers.join('\n ')}\n`

    }
}).setFps(2)

const renderDisplay = () => {
    const guiX = data.splasherDisplay.x
    const guiY = data.splasherDisplay.y
    const scale = data.splasherDisplay.scale

    height = ((lines.replace(/[^\n]/g, "").length)*9 +10 ) *scale
    width = base_width * scale
    const rectangle = new Rectangle(Renderer.color(0, 0, 0, 50), guiX, guiY, width, height) // background
    rectangle.draw()

    Renderer.translate(guiX, guiY, 1000)
    Renderer.scale(scale)
    
    Renderer.drawStringWithShadow(lines, 5, 5) // text

    Renderer.retainTransforms(false)
    Renderer.finishDraw()
}

registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!opened) return
    renderDisplay()
}), () => opened)

register("clicked", (x, y, btn, state) => {
    if (opened && !splasherGui.isOpen() && state) {
        if ((y <= data.splasherDisplay.y + height && y >= data.splasherDisplay.y) &&
            (x <= data.splasherDisplay.x + width && x >= data.splasherDisplay.x)) {
                
            const copy =
`[Bingo+] Extracted splasher display at <t:${Math.floor(Date.now()/1000)}>
**This is not a definitive leecher list!** Please proofcheck before issuing punishments.
\`\`\`${lines.removeFormatting()}\`\`\``

            ChatLib.command(`ct copy ${copy}`, true)
            ChatLib.chat(`${constants.PREFIX}&aCopied current info to clipboard!`)
        }
    }
})