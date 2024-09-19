// inspired by azuredclient
import constants, { data } from "../utils/constants"
import Skyblock from "./Skyblock"

const changelogMessage = (text) => {
    new TextComponent(text).setClickAction("run_command").setClickValue("/b+").chat()
}

sentStep = register("step", () => {
    if (!Skyblock.inSkyblock) return
    sentStep.unregister()

    const version = JSON.parse(FileLib.read("BingoPlus", "metadata.json")).version
    if (version !== data.lastVersion) {
    
        changelogMessage(`&6&m${ChatLib.getChatBreak(" ")}`)
        changelogMessage(`${ChatLib.getCenteredText(constants.PREFIX)}&bv${version}`)

        const changelog = FileLib.read("BingoPlus", "changelog.txt")
        const lines = changelog.replace(/\r\n/g, "\n").split("\n")
        lines.forEach(line => {
            let newLine = ""
            if (line.startsWith('+')) newLine = "&a" + line
            else if (line.startsWith('-')) newLine = "&c" + line
            else if (line.startsWith('=')) newLine = "&7" + line
            else newLine = line
            changelogMessage(newLine)
        })

        changelogMessage(`&6&m${ChatLib.getChatBreak(" ")}`)
    }

    data.lastVersion = version
    data.save()

}).setFps(1)



