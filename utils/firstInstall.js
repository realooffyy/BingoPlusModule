import { PREFIX, data } from "./constants"

const checkFirstInstall = () => {
    if (!data.firstTime) return
    data.firstTime = false
    data.save()

    const msgs = [
        `${constants.PREFIX}`,
        "&rThank you for installing &6Bingo+!",
        "&rRun the &6/b+ command to get started
        "&rIf you need any help, join the Discord!"
        ]
    msgs.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))


register("tick", () => {
    checkFirstInstall()
})
