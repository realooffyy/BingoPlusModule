import settings from "../settings"
import constants from "../utils/constants"
import emojis from "../utils/emojis"

register("messageSent", (message) => {
    if (message.startsWith("/") && !message.startsWith("/pc") && !message.startsWith("/ac") && !message.startsWith("/gc")) return

    let replaced = false

    for (const key in emojis.emojis) {
      if (message.includes(key)) {
        replaced = true
        message = message.replace(key, emojis.emojis[key]);
      }
    }
    
    if (!replaced) return
    cancel(event)
    ChatLib.say(message)
})
