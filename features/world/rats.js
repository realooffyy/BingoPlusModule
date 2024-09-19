import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"
import constants, { ratLocations } from "../../utils/constants"
import { renderWaypoint } from "../../render/utils"
import { registerWhen } from "../../utils/utils"
import RenderLibV2 from "../../../RenderLibV2"


const ratTexture = "ewogICJ0aW1lc3RhbXAiIDogMTYxODQxOTcwMTc1MywKICAicHJvZmlsZUlkIiA6ICI3MzgyZGRmYmU0ODU0NTVjODI1ZjkwMGY4OGZkMzJmOCIsCiAgInByb2ZpbGVOYW1lIiA6ICJCdUlJZXQiLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYThhYmI0NzFkYjBhYjc4NzAzMDExOTc5ZGM4YjQwNzk4YTk0MWYzYTRkZWMzZWM2MWNiZWVjMmFmOGNmZmU4IiwKICAgICAgIm1ldGFkYXRhIiA6IHsKICAgICAgICAibW9kZWwiIDogInNsaW0iCiAgICAgIH0KICAgIH0KICB9Cn0="
const warning = new TextComponent(`${constants.PREFIX}&aRat waypoints are enabled! &rRun &6/rats&r to disable.`)
                .setClick('run_command', '/b+ rat')

let warningSent = false
let rats = []

// feature (Rat Waypoints)
registerWhen(register("renderWorld", () => {
    if (Skyblock.area !== 'Hub') return
    if (!warningSent) { ChatLib.chat(warning); warningSent = true}
    ratLocations.forEach(element => {
        const [x, y, z, text] = element
        renderWaypoint(text, x, y, z, 255, 255, 255, 1, 4, false, settings().ratWaypointsShowBeacon, false, false)
    })
}), () => settings().ratWaypoints)

register("worldLoad", () => { warningSent = false })

// feature (Highlight rats)
register("tick", () => {
    if (!settings().highlightRats) return
    if (Skyblock.area !== 'Hub') return
    rats = []
    
    World.getAllEntitiesOfType(Java.type('net.minecraft.entity.item.EntityArmorStand')).forEach(rat => {
        if (rat?.getEntity()?.func_71124_b(4)?.func_77978_p()?.toString()?.includes(ratTexture)) {
            rats.push([rat.getX(), rat.getY(), rat.getZ()])
        }
    })
})
registerWhen(register("renderWorld", () => {
    const rgba = settings().highlightRatsColour
    rats.forEach(rat => {
        RenderLibV2.drawEspBoxV2(rat[0], rat[1]+1.45, rat[2], .6, .6, .6, rgba[0]/255, rgba[1]/255, rgba[2]/255, rgba[3]/255, false, 10)
    })
}), () => settings().highlightRats && rats) 