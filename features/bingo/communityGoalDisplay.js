/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { data } from "../../utils/constants"
import settings from "../../settings"
import Skyblock from "../../../BloomCore/Skyblock"
import { registerWhen } from "../../../BloomCore/utils/Utils"

/*
const display = new Display()
display.setRenderLoc(data.communityGoalDisplay.x, data.communityGoalDisplay.y)
display.setRegisterType("post gui render")
display.setBackground(DisplayHandler.Background.FULL);
display.setBackgroundColor(Renderer.BLACK);
*/

const community_slots = [2, 12, 22, 32, 42]

let bingoCardOpened = false
let stringReady = true

let opened = false

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



register("postGuiRender", () => {
    if (!settings.community_goal_display || !Skyblock.inSkyblock) return
    let inv = Player.getContainer()
    if (!bingoCardOpened && inv?.getName() == "Bingo Card") {
        stringReady = false
        bingoCardOpened = true
        guiElements = resetElements()

        let guiLoaded = register("tick", (t) => {
            if (inv?.getItems()[42] == null) return

            let items = community_slots.map(slot => inv.getItems()[slot])
            console.log(items)
            for (let i = 0; i < 5; i++) {
                console.log("Testing item "+i)
                if (!/.*(I|II|III|IV|V).*/g.test(items[i].getName())) return //inv?.getStackInSlot(inv?.getSize() - 37) == null ||
            }
                
            guiLoaded.unregister()

            
            ChatLib.chat("loaded bingo card items")
            for (let i = 0; i < 5; i++) {
                let item = items[i]
                //console.log(item)
                guiElements.goals[i][0] = item.getName()

                let contribution = ''
                for (const line of item.getLore()){
                    //console.log(line)
                    if (/§5§o§7Contribution: .*/g.test(line)) guiElements.goals[i][1] = `${line.replace("§5§o§7Contribution: ",'')}`
                    if (/§7§cYou have not contributed towards/g.test(line)) guiElements.goals[i][1] = `&cNo contribution!&r`
                    if (/  §8Top .*/g.test(line)) contribution = ` &8(${line.replace('  ','')}&8)`
                    if (/  §6§l#\d+ §fcontributor/g.test(line)) contribution = ` &8(${line.replace('  ','')}&8)`

                }
                guiElements.goals[i][2] = contribution

                /*
                // log all goals in console
                for (let i = 0; i < 5; i++) {
                  console.log(guiElements.goals[i])
                }
                */
            }

            let closeListener = register("guiClosed", () => {
                bingoCardOpened = false
                ChatLib.chat("unloaded listener")
                closeListener?.unregister()
            })
        })
    }
})

registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!bingoCardOpened) return

    let x = data.communityGoalDisplay.x
    let y = data.communityGoalDisplay.y

    const rectangle = new Rectangle(Renderer.color(0,0,0,180), x-5, y-5, 200, 150)
    rectangle.draw()

    if (!stringReady) renderStr = compileString(); stringReady = true

    Renderer.translate(x, y)
    Renderer.scale(data.communityGoalDisplay.scale ?? 1)

    Renderer.drawStringWithShadow(renderStr, 0, 0)

}), () => bingoCardOpened)


register("dragged", (dx, dy, x, y) => {
    if (!bingoCardOpened || !settings.communityGoalDisplayMove.isOpen()) {
        data.communityGoalDisplay.x = x
        data.communityGoalDisplay.y = y
        data.save()
    }
    
})

function resetElements() {
    table = {
        name: "&6&lCommunity Goals",
        goals: [
            ["Goal 1", "Contribution", "(Top %)"],
            ["Goal 2", "Contribution", "(Top %)"],
            ["Goal 3", "Contribution", "(Top %)"],
            ["Goal 4", "Contribution", "(Top %)"],
            ["Goal 5", "Contribution", "(Top %)"]
        ]
    }
    return table
}

function compileString() {
    let str = ''
    str += `${guiElements.name}\n\n` // title
    for (let i = 0; i < 5; i++) {
        str += `  &a✔ ${guiElements.goals[i][0]}\n` // goal title
        str += ` ${guiElements.goals[i][1]} ${guiElements.goals[i][2]}\n` // goal contrib
    }
    return str
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
