import RenderLib from "../../../RenderLib/index.js"
import renderBeaconBeam from "../../../BeaconBeam"

import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import constants, { rats } from "../../utils/constants"

const warning = new TextComponent(`${constants.PREFIX}&aRat waypoints are enabled! &rRun &6/rats&r to disable.`)
                .setClick('run_command', '/rats')

let warningSent = false

register("renderWorld", () => {
    if (!settings().ratWaypoints || Skyblock.area !== 'Hub') return
    if (!warningSent) { ChatLib.chat(warning); warningSent = true}
    rats.forEach(element => {
        const [x, y, z, text] = element
        RenderLib.drawInnerEspBox(x, y, z, 1, 1, 0, 1, 0, 0.15, true)
        if (settings().ratWaypointsShowText) Tessellator.drawString(text, x, y, z)
        if (settings().ratWaypointsShowBeacon) renderBeaconBeam(x-0.5, y, z-0.5, 0, 1, 0, 1, false, 300)
    })
})

register("worldLoad", () => { warningSent = false })

// todo: hide beacon/text/waypoint after killing a rat nearby