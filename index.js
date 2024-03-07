ChatLib.chat("Started Bingo+ loading")

import Settings from "./settings"
ChatLib.chat("Loaded settings")

import "./features/bingo/chickenHeadTimer"

// Features
import "./features/dialogueSkipper"
ChatLib.chat("0")
//import "./features/bestiaryunlock"
ChatLib.chat("1")
import "./features/fakeEmojis"
ChatLib.chat("2")
import "./features/blockSkyMallMessages"
ChatLib.chat("3")

import "./features/bingo/copyAchievements"
ChatLib.chat("copyAchiemenents")
import "./features/bingo/blockPartyTravelMessages"
ChatLib.chat("4")
import "./features/bingo/bakerBlocker"
ChatLib.chat("5")
import "./features/bingo/communityGoalDisplay"
ChatLib.chat("community goal display")

// Commands
import "./commands/skycrypt"
ChatLib.chat("7")
import "./commands/showtitle"
ChatLib.chat("8")

// Bingo+
register("command", () => { Settings.openGUI() } ).setName("b+").setAliases(["bingo+","bingop","bingoplus"])

ChatLib.chat("Bingo+ fully initialised!")