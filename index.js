import Settings from "./settings"

// Features
import "./features/dialogueskip"
import "./features/bestiaryunlock"
//import "./features/emojisend"
import "./features/copyachievements"
//import "./features/playercount"
//import "./features/chickenhead"
import "./features/bakerblock"
import "./features/communitygoaldisplay"



import "./commands/skycrypt"
import "./commands/showtitle"

// Commands
register("command", () => { Settings.openGUI() } ).setName("b+").setAliases(["bingo+","bingop","bingoplus"])