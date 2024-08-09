/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import constants, { data } from "../../utils/constants"
import settings from "../../settings"
import { highlightSlot } from "../../utils/utils"

import Skyblock from "../../utils/Skyblock"

// todo: rewrite this and seperate different hub selector features

const nameRegex = /§(a|c)(?:Dungeon|SkyBlock) Hub #(\d{1,2})/
// https://regex101.com/r/b8Gx1Q/1
const playerRegex = /§5§o§7Players: (\d{1,2})\/(\d{1,2})/
// https://regex101.com/r/GnWTYM/1
//const serverName = 

const display = new Display()
display.setRenderLoc(data.hubSelectorDisplay.x, data.hubSelectorDisplay.y)
display.setBackground(DisplayHandler.Background.FULL)
display.setRegisterType("post gui render")

let hubSelectorOpened = false
let opened = false

let lines = '&e&lHub Selector'
let bestHubs = []
let otherHubs = []

let grabX, grabY
let grabbed = false

register("tick", () => {
    display.setRenderLoc(data.hubSelectorDisplay.x, data.hubSelectorDisplay.y)
    opened = hubSelectorOpened
})

register("guiRender", (e) => {
    if (!settings().hubSelectorHighlightBestHubs) return
    let rgba = [0, 0, 0, 255]
    bestHubs.forEach(x => {
        if (x[2] === 'c') rgba = [255, 0, 0, 255]
        if (x[2] === 'a') rgba = [0, 255, 0, 255]
        highlightSlot(x[3], rgba)  
    })
})

register("guiRender", () => {
    if (!settings().hubSelectorDisplay || !Skyblock.inSkyblock) return
    const container = Player.getContainer()
    if (!hubSelectorOpened && (container?.getName() == "SkyBlock Hub Selector" || container?.getName() == "Dungeon Hub Selector")) {
        
        lines = ''
        let guiLoaded = register("tick", () => {
            if (container?.getStackInSlot(container?.getSize() - 37) == null) return
            guiLoaded.unregister()
            hubSelectorOpened = true

            let closeListener = register("guiClosed", () => {
                hubSelectorOpened = false
                guiLoaded?.unregister()
                closeListener?.unregister()
                display?.clearLines()
                bestHubs = []
            })

            const hubs = []
            let emptyWarning = false
            let restartWarning = false

            for (let i = 10; i < container?.getSize() - 36 - 10; i++) {
                let item = container?.getItems()[i]
                let name = item.getName()
                let slotNumber = i
                if (name != ' ') {
                    if (nameRegex.test(name)) {
                        let title = nameRegex.exec(name)

                        let titleColour = title[1]
                        let hubNumber = title[2]

                        let playerCount, playerMax, slotsLeft
                        
                        item.getLore()?.forEach(element => {
                            if (playerRegex.test(element)) {
                                const match = playerRegex.exec(element)
                                playerCount = match[1]
                                playerMax = match[2]
                                slotsLeft = playerMax-playerCount
                                
                                if (settings().hubRestartWarning) {
                                    if (playerMax == 0 && !restartWarning) {
                                        ChatLib.chat(`${constants.PREFIX}&cDetected a restarting server! &eI recommend waiting before selecting a hub, in case the hubs shift.`)
                                        restartWarning = true
                                    }
                                    else if (playerCount == 0 && !emptyWarning) {
                                        ChatLib.chat(`${constants.PREFIX}&eDetected a server with 0 players, hubs may be shifting or you're just lucky. Check hub number before splashing.`)
                                        emptyWarning = true
                                    }
                                }

                            }                                
                        })
                        
                        hubs.push([hubNumber, slotsLeft, titleColour, slotNumber])
                        
                    }
                }
            }
            
            compileLines(hubs, 1)

            

        })
    }
})

function sort(arr, sortIndex) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j][sortIndex] < arr[j + 1][sortIndex]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

function compileLines(arr, sortIndex) {
    display.clearLines()
    const hubs = sort(arr, sortIndex)

    display.addLine('&e&lHub Selector')
    display.addLine('')

    let bestCount = hubs[0][sortIndex]
    bestHubs = []
    otherHubs = []

    for (let i = 0; i < settings().hubSelectorDisplayTopHubs; i++) {
        let hub = hubs[i]

        if (hub[sortIndex] == bestCount) bestHubs.push(hub)
        else { otherHubs.push(hub) }
    }

    let line = ''
    bestHubs.forEach(hub => {
        line += `&${hub[2]}&l${hub[0]}&7, `
    })
    display.addLine(`${line.slice(0, -2)} &3| &e${bestCount} slots &a&lBEST!`)

    otherHubs.forEach(hub => {
        display.addLine(`&${hub[2]}${hub[0]} &3| &7${hub[sortIndex]} slots`)
    })
}

register("dragged", (dx, dy, x, y) => {
    if (opened) {
        if (grabbed) {
            display.setRenderLoc(data.hubSelectorDisplay.x, data.hubSelectorDisplay.y)
            data.hubSelectorDisplay.x = x-(grabbed ? grabX : 0)
            data.hubSelectorDisplay.y = y-(grabbed ? grabY : 0)
            data.save()
        }
    }
})

register("clicked", (x, y, btn, state) => {
    if (opened) {
        if (state) {
            if ((y <= display.getRenderY() + display.getHeight() && y >= display.getRenderY()) &&
                (x <= display.getRenderX() + display.getWidth() && x >= display.getRenderX())) {
                grabY = y-display.getRenderY()
                grabX = x-display.getRenderX()
                grabbed = true
            } else {
                grabbed = false
            }

        }
    }
})
