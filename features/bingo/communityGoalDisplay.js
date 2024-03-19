/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import Settings from "../../settings"

import { registerWhen } from "../../utils/utils"
import skyblock from "../../utils/Skyblock"


let bingoCardOpened = false
let opened = false

let lines = '&6&lCommunity Goals'

let width = 200
let height = 150

let guiX, guiY, grabX, grabY
let changePos = false

register("step", () => {
    opened = bingoCardOpened
    if (Settings.communityGoalDisplayMove.isOpen()) opened = true
})

register("postGuiRender", () => {
    if (!Settings.community_goal_display || !skyblock.inSkyblock) return
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
            if (inv?.getItems()[42] == null) return

            let items = community_slots.map(slot => inv.getItems()[slot])

            for (let i = 0; i < 5; i++) {
                if (!/^.*(I|II|III|IV|V).*$/g.test(items[i].getName())) return
            }
                
            guiLoaded.unregister()

            for (let i = 0; i < 5; i++) {
                let item = items[i]
                guiElements.goals[i][0] = item.getName()

                let contribution = ''
                for (const line of item.getLore()){
                    //console.log(line)
                    if (/§5§o§7Contribution: .*/g.test(line)) guiElements.goals[i][1] = `${line.replace("§5§o§7Contribution: ",'')}`
                    if (/§7§cYou have not contributed towards/g.test(line)) guiElements.goals[i][1] = `&cNo contribution!&r`
                    if (/  §8Top .*/g.test(line)) contribution = ` &f(Top${line.replace('  §8Top','')}&f)`
                    if (/  §6§l#\d+ §fcontributor/g.test(line)) contribution = ` &8(${line.replace('  ','')}&8)`

                }
                guiElements.goals[i][2] = contribution

                compileLines(guiElements)

                /*
                // log all goals in console
                for (let i = 0; i < 5; i++) {
                  console.log(guiElements.goals[i])
                }
                */
            }

            let closeListener = register("guiClosed", () => {
                bingoCardOpened = false
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

const renderCommunityGoals = () => {
    Renderer.retainTransforms(true)

    guiX = data.communityGoalDisplay.x
    guiY = data.communityGoalDisplay.y

    const rectangle = new Rectangle(Renderer.color(0,0,0,150), guiX, guiY, width, height) // background
    rectangle.draw()

    Renderer.translate(guiX, guiY, 1000)
    Renderer.scale(data.communityGoalDisplay.scale ?? 1)
    
    Renderer.drawStringWithShadow(lines, 5, 5) // text

    Renderer.retainTransforms(false)
    Renderer.finishDraw()
}

// todo: learn how to implement elementa OR how to make the overlay go over inventory
registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!opened) return
    renderCommunityGoals()
}), () => opened)


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

