/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import settings from "../../settings"
import Skyblock from "../../../BloomCore/Skyblock"
import { registerWhen } from "../../utils/utils"

const community_slots = [2, 12, 22, 32, 42]

let bingoCardOpened = false
let opened = false

let lines = ''

register("step", () => {
    opened = bingoCardOpened
    if (settings.communityGoalDisplayMove.isOpen()) return opened = true
})

register("postGuiRender", () => {
    if (!settings.community_goal_display || !Skyblock.inSkyblock) return
    let inv = Player.getContainer()
    if (!bingoCardOpened && inv?.getName() == "Bingo Card") {
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

registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!opened) return

    let x = data.communityGoalDisplay.x
    let y = data.communityGoalDisplay.y

    const rectangle = new Rectangle(Renderer.color(0,0,0,180), x-5, y-5, 200, 150)
    rectangle.draw()

    Renderer.translate(x, y)
    Renderer.scale(data.communityGoalDisplay.scale ?? 1)

    // Move GUI
    if (settings.communityGoalDisplayMove.isOpen()) { Renderer.drawStringWithShadow(lines, 0, 0); return }

    Renderer.drawStringWithShadow(lines, 0, 0)

}), () => opened)


register("dragged", (dx, dy, x, y) => {
    if (settings.communityGoalDisplayMove.isOpen()) {
        data.communityGoalDisplay.x = x
        data.communityGoalDisplay.y = y
        data.save()
    }
})

function compileLines(x) {
    let str = ''
    str += `${x.name}\n\n` // title
    for (let i = 0; i < 5; i++) {
        str += `  &a✔ ${x.goals[i][0]}\n` // goal title
        str += ` ${x.goals[i][1]} ${x.goals[i][2]}\n` // goal contrib
    }
    lines = str
}

/*
register("clicked", (x, y, btn, state) => {
    if (opened) {
        if (state) {
            if ((y <= display.getRenderY() + display.getHeight() && y >= display.getRenderY()) &&
                (x <= display.getRenderX() + display.getWidth() && x >= display.getRenderX())) {
                changePos = true
            } else {
                changePos = false
            }

        }
    }
})
*/
