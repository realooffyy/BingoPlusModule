import settings from "../../settings"
import constants from "../../utils/constants"
import { getBrewingStands } from "./brewingStandUtils"

const confirmMessage = new TextComponent(`${constants.PREFIX}&cWarp blocked as you are brewing! &e&lCLICK &eto confirm warp.`)
    .setClickAction("run_command")
    .setHoverValue("&e&lCLICK &eto warp")

const warpKeywords = [
    "warp", "warpforge",
    "hub",
    "visit",
    "l", "lobby",
    "limbo"
]
let warpBlockedTime = 0

register("messageSent", (msg, e) => {
    if (!settings().brewingPreventWarpingOut) return
    if (warpBlockedTime > Date.now() - 5000) return
    if (!getBrewingStands().length) return
    if (!msg.startsWith("/")) return

    let m = msg.substring(1).split(" ")[0].toLowerCase()
    if (!warpKeywords.some(word => m == word)) return

    cancel(e)
    confirmMessage
        .setClickValue(msg) 
        .chat()
    warpBlockedTime = Date.now()
})