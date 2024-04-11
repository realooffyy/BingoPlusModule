/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import Settings from "../../settings"
import Skyblock from "../../utils/Skyblock"

const display = new Display()
display.setRenderLoc(data.communityGoalDisplay.x, data.communityGoalDisplay.y)
display.setBackground(DisplayHandler.Background.FULL)
display.setRegisterType("post gui render")

let bingoCardOpened = false
let opened = false

let lines = 'Loading Community Goal data...'

let grabX, grabY

let grabbed = false

register("tick", () => {
    display.setRenderLoc(data.communityGoalDisplay.x, data.communityGoalDisplay.y)
    opened = bingoCardOpened || Settings.communityGoalDisplayMove.isOpen()
    if (Settings.communityGoalDisplayMove.isOpen()) {
        display.clearLines()
        display.addLine("&6&lCommunity Goals")
        let closeListener = register("guiClosed", () => {
            closeListener?.unregister()
            display?.clearLines()
        })
    }
})

register("postGuiRender", () => {
    if (!Settings.communityGoalDisplay || !Skyblock.inSkyblock) return
    let inv = Player.getContainer()
    if (!bingoCardOpened && inv?.getName() == "Bingo Card") {
        const community_slots = [2, 12, 22, 32, 42]
        let guiElements = {
            name: "&6&lCommunity Goals",
            goals: [
                ["Goal 1", "Contribution", "(Top %)", 0],
                ["Goal 2", "Contribution", "(Top %)", 0],
                ["Goal 3", "Contribution", "(Top %)", 0],
                ["Goal 4", "Contribution", "(Top %)", 0],
                ["Goal 5", "Contribution", "(Top %)", 0]
            //    name      contribution     top %    goal tier
            ]
        }
        lines = 'Loading Community Goal data...'
        bingoCardOpened = true

        let guiLoaded = register("tick", (t) => {

            let closeListener = register("guiClosed", () => {
                bingoCardOpened = false
                guiLoaded?.unregister()
                closeListener?.unregister()
                refresh?.unregister()
                display?.clearLines()
            })
            
            if (inv?.getStackInSlot(inv?.getSize() - 37) == null) return
                
            guiLoaded.unregister()

            let refresh = register("step", () => {
                let items = community_slots.map(slot => inv.getItems()[slot])

                for (let i = 0; i < 5; i++) {
                    let item = items[i]
                    guiElements.goals[i][0] = item.getName()

                    let contribution = ''
                    for (const line of item.getLore()){
                        console.log(line)
                        if (/§5§o§7Contribution: .*/g.test(line)) guiElements.goals[i][1] = `${line.replace("§5§o§7Contribution: ",'')}`
                        if (/§7§cYou have not contributed towards/g.test(line)) guiElements.goals[i][1] = `&cNo contribution!&r`
                        if (/  §8Top .*/g.test(line)) contribution = ` &f(Top${line.replace('  §8Top','')}&f)`
                        if (/  §6§l#\d+ §fcontributor/g.test(line)) contribution = ` &8(${line.replace('  ','')}&8)`

                    }
                    guiElements.goals[i][2] = contribution
                }

                compileLines(guiElements)

            }).setFps(1)
        })
    }
})


function compileLines(list) {
    display?.clearLines()
    display?.addLine(`${list.name}`) // title
    display?.addLine('') // empty
    for (let i = 0; i < 5; i++) {
        display?.addLine(`  &a✔ ${list.goals[i][0]}`) // goal title
        display?.addLine(` ${list.goals[i][1]} ${list.goals[i][2]}`) // goal contrib
    }
}

register("dragged", (dx, dy, x, y) => {
    if (opened) {
        if (grabbed || Settings.communityGoalDisplayMove.isOpen()) {
            display.setRenderLoc(data.communityGoalDisplay.x, data.communityGoalDisplay.y)
            data.communityGoalDisplay.x = x-(grabbed ? grabX : 0)
            data.communityGoalDisplay.y = y-(grabbed ? grabY : 0)
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
