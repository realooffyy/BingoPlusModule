ChatLib.chat("Loading Bingo+...")

import "./utils/firstInstall"
import "./utils/bingoApi"

// Commands
import { bingoPlusCommand } from "./commands/bingoPlusCommand"
import "./commands/skycrypt"
import "./commands/showtitle"
import "./commands/centuryCakeIsland"

// Features
import "./features/bingo/bakerBlocker"
import "./features/bingo/blockPartyTravelMessages"
import "./features/bingo/chickenHeadTimer"
import "./features/bingo/communityGoalDisplay"
import "./features/bingo/copyAchievements"
import "./features/bingo/hideCompleteBingoGoals"

import "./features/chat/blockSkyMallMessages"
import "./features/chat/dialogueSkipper"
import "./features/chat/sendFeatures"
import "./features/chat/blockParkourMessages"
import "./features/chat/oringoCost"

import "./features/splasher/splasherDisplay"
import "./features/splasher/noPotionWarning"

ChatLib.chat("Bingo+ fully initialised!")

/* TODO
 * - organise .js into subfolders
 * - optimise dialogue skipper and figure out if im allowed to autoskip
 * - command for accessing bingo party commands
 * - reminder to do bingo stuff like cakes, experiments, fetchur, puzzler
 * - timer for bingo end and profile deletion
 * - rat waypoints
 * - hotm tree unlock reminders
 * - king talisman helper!
 * - disable fake emojis if user has mvp++ or yt rank 
 * - fetchur/puzzler solvers?? so many mods have this xD
 * - add button to community goal display to pin the render
 * - custom bingo achievements
 * - trapper display
 * - splash display
 * - splasher features
 *      add overlay for currently hovering potion
 * - detect keystroke to reset overlay location (probably R)
 * - dreadlord sword drop warning
 * - splash display private island mvp++ extras
 * - splash display estimated hub number
 */

/* IN PROGRESS
 * 
 */

/* DONE
 * - message for first install
 * - command for visiting a cake hub
 * - make the firstInstall thing clickable and runs /b+
 * - remove bloomcore dependencies
 * - leecher display
 * - warn if you're entering the pet care without potions
 * - hide completed bingo goals
 * - grab bingo info from api on startup or smt
 * - abiphone oringo cost 
 */

/* CANCELLED (probably)
 * - implement elementa to community goal display bc the renderer thing isn't getting past the inventory overlay
 */
