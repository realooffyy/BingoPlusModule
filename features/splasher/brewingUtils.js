import settings from "../../settings"
import constants from "../../utils/constants"
import { getBrewingStands } from "./brewingStandUtils"

const confirmMessage = new TextComponent(`${constants.PREFIX}&cWarp blocked as you are brewing! &e&lCLICK &eto confirm warp.`)
    .setClickAction("run_command")
const warpKeywords = [
    "warp",
    "hub"
]
let warpBlockedTime = 0


register("messageSent", (msg, e) => {
    if (!settings().brewingPreventWarpingOut) return
    if (warpBlockedTime > Date.now() - 5000) return
    if (!getBrewingStands().length) return
    if (!msg.startsWith("/")) return

    const m = msg.substring(1)
    if (!warpKeywords.some(word => m.startsWith(word))) return

    cancel(e)
    confirmMessage.setClickValue(msg).chat()
    warpBlockedTime = Date.now()
})