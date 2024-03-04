import settings from "../settings"
import emojis from "../utils/emojis"

register("messageSent", (message) => {
    //if (message.startsWith("/") && !message.startsWith("/pc") && !message.startsWith("/ac") && !message.startsWith("/gc") && !message.startsWith("/cc")) return
    if (message.startsWith("/") && !["/pc", "/ac", "/gc", "/cc", "/oc"].includes(message)) return

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
