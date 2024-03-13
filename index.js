ChatLib.chat("Loading Bingo+...")

import "./utils/firstInstall"

// Features
import "./features/blockSkyMallMessages"
import "./features/dialogueSkipper"
import "./features/chatFeatures"

import "./features/bingo/bakerBlocker"
import "./features/bingo/blockPartyTravelMessages"
import "./features/bingo/chickenHeadTimer"
import "./features/bingo/communityGoalDisplay"
import "./features/bingo/copyAchievements"

// Commands
import { bingoPlusCommand } from "./commands/bingoPlusCommand"
import "./commands/skycrypt"
import "./commands/showtitle"
import "./commands/centuryCakeIsland"

ChatLib.chat("Bingo+ fully initialised!")

/* TODO
 * - optimise dialogue skipper and figure out if im allowed to autoskip
 * - command for accessing bingo party commands
 * - reminder to do bingo stuff like cakes, experiments, fetchur, puzzler
 * - timer for bingo end and profile deletion
 * - hide completed bingo goals
 * - rat waypoints
 * - hotm tree unlock reminders
 * - king talisman helper!
 * - disable fake emojis if user has mvp++ or yt rank 
 * - fetchur/puzzler solvers?? so many mods have this xD
 * - remove bloomcore dependencies
 * - make the firstInstall thing clickable and runs /b+
 * - add button to community goal display to pin the render
 * - bingo achievements
 * - trapper display
 * - splash display
 * - grab bingo info from api on startup or smt
 * - splasher features
 *      add overlay for currently hovering potion
 *      leecher display
 */

/* IN PROGRESS

 */

/* DONE
 * - message for first install
 * - command for visiting a cake hub
 */

/* CANCELLED (probably)
 * - implement elementa to community goal display bc the renderer thing isn't getting past the inventory overlay
 */