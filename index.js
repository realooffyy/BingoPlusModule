import "./utils/firstInstall"
import "./utils/BingoApi"

import "./render/registerGui"

// Commands
import { bingoPlusCommand } from "./commands/bingoPlusCommand"
import "./commands/centuryCakeIsland"
import "./commands/bingoParty"
import "./commands/ratHelper"
//import "./commands/guideSearch"

// Legacy rendering
import "./render/move"

// Features
import "./features/bingo/accurateBingoPlaytime"
import "./features/bingo/achievements"
import "./features/bingo/bakerBlocker"
import "./features/bingo/bingoCardDisplay"
import "./features/bingo/bingoTimerDisplay"
import "./features/bingo/chickenHeadTimer"
import "./features/bingo/communityGoalDisplay"
//import "./features/bingo/dreadlordPickup"
import "./features/bingo/hideCompletedBingoGoals"

import "./features/party/chatBlockers"

import "./features/chat/dialogueSkipper"
import "./features/chat/oringoCost"

import "./features/splasher/splasherDisplay"
import "./features/splasher/noPotionWarning"
import "./features/splasher/hubSelectorDisplay"

import "./features/world/rats"
import "./features/world/puzzlerSolver"


/* TODO
 * - reminder to do bingo stuff like cakes, experiments, fetchur, puzzler, bednom
 * - hotm tree unlock reminders
 * - king talisman helper!
 * - fetchur/puzzler solvers?? so many mods have this xD
 * - community goal display stuff
 *      make it pinnable
 *      show total bingo points you're getting from current tiers and stuff
 * - custom bingo achievements
 * - trapper display
 * - splash display
 * - splasher features
 *      add overlay for currently hovering potion
 * - dreadlord sword drop warning
 * - splash display hub number guess
 * - brewing stand name display
 */


/*
    1.1.2 changelog
- added accurate bingo playtime

    1.1.1 changelog 
- added automatic achievement sending in party and guild
- added disclaimer to leecher display
- added puzzler solver
- changed rat waypoint colours
- optimised community goal display
 */