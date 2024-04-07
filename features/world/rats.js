import RenderLib from "../../../RenderLib/index.js"
import Settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import { rats } from "../../utils/constants"

register("renderWorld", () => {
    if (!Settings.ratWaypoints || Skyblock.area !== 'Hub') return
    rats.forEach(element => {
        RenderLib.drawEspBox(element[0], element[1], element[2], 1, 1, 1, 0, 0, 1, true)  
    })
})