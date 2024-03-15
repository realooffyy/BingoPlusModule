import constants from "../utils/constants"
import { data } from "../utils/constants"

const checkFirstInstall = () => {
    if (!data.firstTime) return
    data.firstTime = false
    data.save()

    ChatLib.chat(`&6&m${ChatLib.getChatBreak(" ")}`)
    ChatLib.chat(`&rThank you for installing ${constants.PREFIX}!`)
    new TextComponent("&rRun the &6/b+ &rcommand to get started").setClick("run_command", "/b+")
    ChatLib.chat(`&6&m${ChatLib.getChatBreak(" ")}`)
}


register("tick", () => {
    checkFirstInstall()
})
