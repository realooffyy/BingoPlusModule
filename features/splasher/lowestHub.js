/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import Settings from "../../settings"

import skyblock from "../../utils/Skyblock"
import { getValue } from "../../utils/utils"

const nameRegex = /§(a|c)(?:Dungeon|SkyBlock) Hub #(\d{1,2})/
//https://regex101.com/r/b8Gx1Q/1
const playerRegex = /§5§o§7Players: (\d{1,2})\/(\d{1,2})/g

let hubSelectorOpened = false
let opened = false

let lines = '&6&lHub Selector'
let hubs = []
// hub number, player count, player max, current?, 

let width = 200
let height = 150

let guiX, guiY
let changePos = false

register("tick", () => {
    opened = hubSelectorOpened
    if (Settings.communityGoalDisplayMove.isOpen()) opened = true
})

register("postGuiRender", () => {
    if (!Settings.hubSelectorDisplay || !skyblock.inSkyblock) return
    let container = Player.getContainer()
    if (!hubSelectorOpened && (container?.getName() == "SkyBlock Hub Selector" || container?.getName() == "Dungeon Hub Selector")) {
        
        lines = ''
        let guiLoaded = register("tick", () => {
            if (container?.getStackInSlot(container?.getSize() - 37) == null) return
            guiLoaded.unregister()
            hubSelectorOpened = true

            hubs = []

            for (let i = 10; i < container?.getSize() - 36 - 10; i++) {
                let item = container?.getItems()[i]
                let name = item.getName()
                if (name != ' ') {
                    let title = ''
                    let hub = 0
                    let current = false
                    if (nameRegex.test(name)) {
                        title = nameRegex.exec(name)
                        if (title != null) {
                            if (title[1] == 'a') current = false
                            if (title[1] == 'c') current = true
                            hub = title[2]
                            
                            item.getLore()?.forEach(element => {
                                if (playerRegex.test(element)) {
                                    []
                                }
                            })
                        }
                        
                    }
                    ChatLib.chat(`Hub ${hub}, ${current}`)
                }
            }

            let closeListener = register("guiClosed", () => {
                hubSelectorOpened = false
                closeListener?.unregister()
            })
        })
    }
})

function compileLines(list) {
    let str = ''
    str += `${list.name}\n\n` // title
    for (let i = 0; i < 5; i++) {
        str += `  &a✔ ${list.goals[i][0]}\n` // goal title
        str += ` ${list.goals[i][1]} ${list.goals[i][2]}\n` // goal contrib
    }
    lines = str
}

/*
register("dragged", (dx, dy, x, y) => {
    if (changePos) {
        data.communityGoalDisplay.x = x-grabX-5
        data.communityGoalDisplay.y = y-grabY-5
        data.save()
    }
})

register("clicked", (x, y, btn, state) => {
    if (!opened) return
    if (state) {
        guiX = data.communityGoalDisplay.x
        guiY = data.communityGoalDisplay.y
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

*/