import settings from "../../settings";
import constants from "../../utils/constants"

const community_slots = [2, 12, 22, 32, 42];

register("guiOpened", (gui) => {
    if (!settings.community_goal_display) return
    const inv = Player.getContainer()
    if (!inv || inv.getName() !== "Bingo Card") return
    ChatLib.chat("in bingo card menu")
    

    const items = community_slots.map(slot => inv.getItems()[slot])
    ChatLib.chat("grabbed all nbts")
    for(let i = 0; i < items.length;) {
        ChatLib.chat(items[i])
    }

    //ChatLib.chat(items)

})

/* from doc on ct discord

let hasOpenedGui = false

register("tick", () => {
    if (hasOpenedGui) return

    const container = Player.getContainer()

    if (container.getName() !== "blah blah") return

    hasOpenedGui = true
})

*/