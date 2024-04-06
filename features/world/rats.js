import RenderLib from "../../../RenderLib/index.js"

import Skyblock from "../../utils/Skyblock.js"
import { rats } from "../../utils/constants"

register("renderWorld", () => {
    if (Skyblock.area !== 'Hub') return
    rats.forEach(element => {
        RenderLib.drawEspBox(element[0], element[1], element[2], 1, 1, 1, 0, 0, 1, true)  
    })
})