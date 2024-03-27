import Settings from "../settings"
import emojis from "../utils/emojis"

const allowedCommands = ["/pc", "/ac", "/gc", "/msg", "/r", "/w", "/cc", "/oc"]

register("messageSent", (message, event) => {
  if (!Settings.fakeEmojis) return
  if (message.startsWith("/") && !allowedCommands.some(cmd => message.startsWith(cmd))) return

  let replaced = false
  message = message.split(" ")
  for (let i = 0; i < message.length; i++) {
    if (Object.keys(emojis).includes(message[i])) {
      replaced = true
      message[i] = emojis[message[i]]
      }
  }
  message = message.join(" ")
  
  if (!replaced) return
  cancel(event)
  ChatLib.say(message)
})
