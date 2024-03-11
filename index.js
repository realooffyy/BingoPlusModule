ChatLib.chat("Loading Bingo+...")

// Features
import "./features/blockSkyMallMessages"
import "./features/dialogueSkipper"
import "./features/fakeEmojis"

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
 * - check if bloom's settings code worked
 * - implement elementa to community goal display bc the renderer thing isn't getting past the inventory overlay
        maybe not
 * - message for first install
 * - optimise dialogue skipper and figure out if im allowed to autoskip
 * - command for accessing bingo party commands
 * - command for visiting a cake hub
 * - reminder to do bingo stuff like cakes, experiments, fetchur, puzzler
 * - timer for bingo end and profile deletion
 * - hide completed bingo goals
 * - rat waypoints
 * - hotm tree unlock reminders
 * - king talisman helper!
 * - disable fake emojis if user has mvp++ or yt rank 
 * - fetchur/puzzler solvers?? so many mods have this xD
 */
