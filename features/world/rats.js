import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import constants, { rats } from "../../utils/constants"
import { renderWaypoint } from "../../render/utils"

const warning = new TextComponent(`${constants.PREFIX}&aRat waypoints are enabled! &rRun &6/rats&r to disable.`)
                .setClick('run_command', '/rats')

let warningSent = false

register("renderWorld", () => {
    if (!settings().ratWaypoints || Skyblock.area !== 'Hub') return
    if (!warningSent) { ChatLib.chat(warning); warningSent = true}
    rats.forEach(element => {
        const [x, y, z, text] = element
        renderWaypoint(text, x, y, z, 255, 255, 255, 1, 4, false, settings().ratWaypointsShowBeacon, false, false)
    })
})

register("worldLoad", () => { warningSent = false })

// todo: hide beacon/text/waypoint after killing a rat nearby