// TODO: command migrated 3/9/24, delete after some time

import constants from "../utils/constants"

const migrationMessage =
    new TextComponent(`${constants.PREFIX}&bLooking for the Rat Waypoints feature? The command is now &a/b+ rat&b!`)
        .setClickAction("run_command")
        .setClickValue("/b+ rat")

register("messageSent", (msg) => {
    if (["/rats", "/ratwaypoints"].some(cmd => msg.startsWith(cmd))) migrationMessage.chat()
})

register("chat", (e) => {
    cancel(e)
}).setCriteria(/Unknown command\. Type "\/help" for help\. \('(?:rats|ratwaypoints)'\)/)