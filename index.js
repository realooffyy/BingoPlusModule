import Settings from "./settings"

// Features
import "./features/dialogueSkipper"
import "./features/bestiaryunlock"
import "./features/fakeEmojis"
import "./features/bingo/copyAchievements"
//import "./features/playercount"
//import "./features/chickenhead"
import "./features/bingo/disablePartyTravelMessages"

import "./features/bingo/bakerBlocker"
import "./features/bingo/communityGoalDisplay"

import "./commands/skycrypt"
import "./commands/showtitle"

// Commands
register("command", () => { Settings.openGUI() } ).setName("b+").setAliases(["bingo+","bingop","bingoplus"])
