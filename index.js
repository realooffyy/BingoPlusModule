import Settings from "./settings"

// Features
import "./features/dialogueSkipper"


import "./features/bestiaryunlock"
ChatLib.chat("1")
import "./features/fakeEmojis"
ChatLib.chat("2")
import "./features/bingo/copyAchievements"
ChatLib.chat("3")
//import "./features/playercount"
//import "./features/chickenhead"
import "./features/bingo/blockPartyTravelMessages"
ChatLib.chat("4")

import "./features/bingo/bakerBlocker"
ChatLib.chat("5")
import "./features/bingo/communityGoalDisplay"
ChatLib.chat("6")

import "./commands/skycrypt"
ChatLib.chat("7")
import "./commands/showtitle"
ChatLib.chat("8")

// Commands
register("command", () => { Settings.openGUI() } ).setName("b+").setAliases(["bingo+","bingop","bingoplus"])

ChatLib.chat("Bingo+ fully initialised!")