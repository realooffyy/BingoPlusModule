import { data } from "../utils/constants"

const checkFirstInstall = () => {
    if (!data.firstTime) return
    data.firstTime = false
    data.save()

    ChatLib.chat(`&6&m${ChatLib.getChatBreak(" ")}`)
    ChatLib.chat(ChatLib.getCenteredText(`&rThank you for importing &6[&6Bingo&c+&6]&r!`))
    new TextComponent(ChatLib.getCenteredText("&rRun the &6/b+ &rcommand to get started")).setClick("run_command", "/b+").chat()
    ChatLib.chat(`&6&m${ChatLib.getChatBreak(" ")}`)
}


register("step", () => {
    if (!World.isLoaded()) return
    checkFirstInstall()
}).setFps(1)