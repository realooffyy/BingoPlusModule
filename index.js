import Settings from "./settings"
ChatLib.chat("Loaded Bingo+ settings")

// Features
import "./features/dialogueSkipper"
//import "./features/bestiaryunlock"
import "./features/fakeEmojis"
import "./features/blockSkyMallMessages"

import "./features/bingo/copyAchievements"
import "./features/bingo/blockPartyTravelMessages"
import "./features/bingo/bakerBlocker"
import "./features/bingo/chickenHeadTimer"
import "./features/bingo/communityGoalDisplay"
import "./features/bingo/potionDuration"

// Commands
import "./commands/skycrypt"
import "./commands/showtitle"

// Bingo+
register("command", () => { Settings.openGUI() } ).setName("b+").setAliases(["bingo+","bingop","bingoplus"])

ChatLib.chat("Bingo+ fully initialised!")