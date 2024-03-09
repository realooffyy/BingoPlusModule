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
// import "./commands/centuryCakeIsland"

ChatLib.chat("Bingo+ fully initialised!")

/* TODO
 * - implement elementa to community goal display bc the renderer thing isn't getting past the inventory overlay
 * - optimise dialogue skipper and figure out if im allowed to autoskip
 * - command for accessing bingo party commands
 * - command for visiting a cake hub
 * - reminder to do bingo stuff like cakes and experiments
 * - timer for bingo end and profile deletion
 * - hide completed bingo goals
 * - rat waypoints
 * - hotm tree unlock reminders
 * - king talisman helper
 */