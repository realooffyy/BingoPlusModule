import Settings from "../../settings"
import emojis from "../../utils/emojis"

const allowedCommands = ["/pc", "/ac", "/gc", "/msg", "/r", "/w", "/cc", "/oc"]
let send = ''

register("messageSent", (message, e) => {
  if (message.startsWith("/") && !allowedCommands.some(cmd => message.startsWith(cmd))) return

  send = ''

  if (Settings.fakeEmojis) {
    const words = message.split(" ")

    let replaced = false
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (emojis.hasOwnProperty(word)) {
        words[i] = emojis[word]
        replaced = true
      }
    }
    if (!replaced) return
    send = words.join(" ")
  }

  else return
  
  cancel(e)
  ChatLib.say(send)
});
