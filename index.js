ChatLib.chat("Loaded Bingo+ settings")

// Features
import "./features/dialogueSkipper"
//import "./features/bestiaryunlock"
import "./features/fakeEmojis"
import "./features/blockSkyMallMessages"

import "./features/bingo/bakerBlocker"
import "./features/bingo/blockPartyTravelMessages"
import "./features/bingo/chickenHeadTimer"
import "./features/bingo/communityGoalDisplay"
import "./features/bingo/copyAchievements"
import "./features/bingo/potionDuration"

// Commands
import { bingoPlusCommand } from "./commands/bingoPlusCommand"
import "./commands/skycrypt"
import "./commands/showtitle"

ChatLib.chat("Bingo+ fully initialised!")

/* TODO
 * - optimise dialogue skipper and figure out if i can even autoskip
 * - command for accessing bingo party commands
 * - command for visiting a cake hub
 * - reminder to do bingo stuff
 * - timer for bingo end + profile deletion
 * - hide completed bingo goals
 */