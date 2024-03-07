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

let opened = false

let guiElements = {
    name: "&6&lCommunity Goals",
    goals: [
        ["Goal 1", "Contribution"],
        ["Goal 2", "Contribution"],
        ["Goal 3", "Contribution"],
        ["Goal 4", "Contribution"],
        ["Goal 5", "Contribution"]
    ]
}



register("postGuiRender", () => {
    if (!settings.community_goal_display) return
    let inv = Player.getContainer()
    if (!opened && inv.getName() == "Bingo Card") {
        opened = true

        let guiLoaded = register("tick", () => {
            if (inv?.getItems()[42] == null) return

            //if (finalItem.getName() != /.*(I|II|III|IV|V).*/g) return //inv?.getStackInSlot(inv?.getSize() - 37) == null || 
            guiLoaded.unregister()

            let items = community_slots.map(slot => inv.getItems()[slot])
            ChatLib.chat("loaded bingo card items")
            for (let i = 0; i < 5; i++) {
                let item = items[i]
                console.log(item)
                guiElements.goals[i][0] = item.getName()
                let contribLine = ''
                for (const line of item.getLore()){
                    if (/§5§o§7Contribution: .*/g.test(line)) contribLine += `${line.replace("§5§o§7Contribution: ",'')}`
                    if (/  §8Top .*/g.test(line)) contribLine += ` &8(${line.replace('  ','')}&8)`
                }
                console.log(contribLine)
                guiElements.goals[i][1] = contribLine
            }

            let closeListener = register("guiClosed", () => {
                opened = false
                ChatLib.chat("unloaded listener")
                closeListener?.unregister()
            })
        })
    }
})


registerWhen(register("renderOverlay", () => { // thanks bloom
    if (!opened
        ) return
    Renderer.translate(data.communityGoalDisplay.x, data.communityGoalDisplay.y)
    Renderer.scale(data.communityGoalDisplay.scale ?? 1)

    Renderer.drawStringWithShadow(guiElements.name, 0, 0)

    for (let i = 0; i < 5; i++) {
        Renderer.translate(data.communityGoalDisplay.x, data.communityGoalDisplay.y)
        Renderer.drawStringWithShadow(`   ${guiElements.goals[i][0]}`, 0, 25*(i+1)-10)
        Renderer.translate(data.communityGoalDisplay.x, data.communityGoalDisplay.y)
        Renderer.drawStringWithShadow(` ${guiElements.goals[i][1]}`, 0, 25*(i+1))
    }
    
}), () => opened)


register("dragged", (dx, dy, x, y) => {
    if (!opened || !settings.communityGoalDisplayMove.isOpen()) {
        data.communityGoalDisplay.x = x
        data.communityGoalDisplay.y = y
        data.save()
    }
    
})

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

/* #2 from trypo
{
    id: "minecraft:emerald_block",
    Count: 1b,
    tag: {
        ench: [],
        display: {
            Lore: ["§8Community Goal", "", "§7§7Gain §b100M Fishing§7 experience.", "", "§7Progress to Skilled II: §e63.9§6%", "§2§l§m                §f§l§m         §r §e63,942,965§6/§e100M", "", "§7Contribution Rewards", "§fTop §e1% §8- §67 Bingo Points", "§fTop §e5% §8- §65 Bingo Points", "§fTop §e10% §8- §64 Bingo Points", "§fTop §e25% §8- §63 Bingo Points", "§fAll Contributors §8- §61 Bingo Point", "", "§7§8§oCommunity Goals are collaborative -", "§8§oanyone with a Bingo profile can help", "§8§oto reach the goal!", "", "§7§8§oThe more you contribute towards the", "§8§ogoal, the more you will be rewarded!", "", "§7Contribution: §a5,757,320 experience", "  §8Top §a0.03%", "  §6§l#2 §fcontributor"],
            Name: "§aSkilled I"
        }
    },
    Damage: 0s
}
*/