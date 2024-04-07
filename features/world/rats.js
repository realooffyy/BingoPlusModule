import RenderLib from "../../../RenderLib/index.js"
import renderBeaconBeam from "../../../BeaconBeam"

import Settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import constants, { rats } from "../../utils/constants"

const warning = new TextComponent(`${constants.PREFIX}&aRat Helper is currently enabled! &rRun &6/rats&r to disable.`)
                .setClick('run_command', '/rats')

let warningSent = false

register("renderWorld", () => {
    if (!Settings.ratHelper || Skyblock.area !== 'Hub') return
    if (!warningSent) { ChatLib.chat(warning); warningSent = true}
    rats.forEach(element => {
        const [x, y, z, text] = element
        RenderLib.drawEspBox(x, y, z, 1, 1, 1, 0, 0, 1, true)
        if (Settings.ratHelperShowText) Tessellator.drawString(text, x, y, z)
        if (Settings.ratHelperShowBeacon) renderBeaconBeam(x-0.5, y, z-0.5, 1, 1, 1, 1, false, 300)
    })
})

register("worldLoad", () => { warningSent = false })

// todo: hide beacon/text/waypoint after killing a rat nearby