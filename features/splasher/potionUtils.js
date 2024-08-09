import { registerWhen } from "../../utils/utils"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"

// Show potion abbreviation
registerWhen(register("renderItemIntoGui", (item, x, y) => {
    const name = item.getName()
    if (!name.includes("Splash Potion")) return
    const text = name.slice(0,5) + "."

    Renderer.translate(x, y, 251) // 251 puts it behind the tooltip, in front of its texture, and in front of head other textures 
    Renderer.scale(0.6)
    Renderer.drawString(text, 0, 0)

}), () => settings().potionAbbreviation && Skyblock.inSkyblock)