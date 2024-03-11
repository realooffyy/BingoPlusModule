import constants from "../utils/constants"
import { data } from "../utils/constants"

const checkFirstInstall = () => {
    if (!data.firstTime) return
    data.firstTime = false
    data.save()
    
    const msgs = [
        `&rThank you for installing ${constants.PREFIX}!`,
        "&rRun the &6/b+ &rcommand to get started"
        ]

    ChatLib.chat(`&6&m${ChatLib.getChatBreak(" ")}`)
    msgs.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))
    ChatLib.chat(`&6&m${ChatLib.getChatBreak(" ")}`)
}


register("tick", () => {
    checkFirstInstall()
})
