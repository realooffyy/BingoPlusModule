import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"

const colours = ["§8", "§c", "§6", "§e", "§2", "§a", "§b"]
const thresholds = [5, 10, 15, 20, 25, 30, 35]

// BUFF! You were splashed by BingoSplasher with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!
const regex =
	/^BUFF! (?:You splashed yourself|You were splashed by (\w{1,16})) with (.*)! Press TAB or type \/effects to view your active effects!$/

let splashedPotions = {}
let messageID = 5967

// splash combo!
register("chat", (user = Player.getName(), potion, event) => {
	if (!Skyblock.inSkyblock) return
	if (!settings().splashCombo) return

	// create user
	if (!splashedPotions[user]) {
		messageID += 1
		splashedPotions[user] = {
			displayName:
				World.getAllPlayers()
					?.find((player) => player?.getName() === user)
					?.getDisplayName()?.text || user,
			id: messageID,
			combo: 0,
			potions: []
		}
	}

	let currentUser = splashedPotions[user]

	// return if the same potion type is already splashed
	// TODO: disregard potion level (roman numerals)
	if (currentUser.potions.includes(potion)) return

	currentUser.potions.push(potion)
	currentUser.combo += 1

	let combo = currentUser.combo

	// chat message
	/*
	ChatLib.clearChat(currentUser.id)
	new Message(`Combo: ${currentUser.combo}`)
		.setChatLineId(currentUser.id)
		.chat()
    */

	// title
	let colour = colours[thresholds.findIndex((threshold) => combo < threshold)]
	if (colour === undefined) colour = "&b"
	Client.showTitle(
		`${colour}${combo} combo!`,
		"", // TODO: fix the splasher not showing
            // `&7Splasher: ${currentUser.displayName}`
		0,
		60,
		20
	)

	// sounds
	const pitch = 0.5 + combo / 20
	World.playSound("note.pling", 100, pitch)
	if (combo <= 10) return
	new Thread(() => {
		Thread.sleep(30)
		World.playSound("random.successful_hit", 100, pitch - 0.5)
		if (combo <= 15) return
		Thread.sleep(5)
		World.playSound("random.orb", 100, pitch - 1)
	}).start()
}).setCriteria(regex)

register("worldLoad", init)

function init() {
	splashedPotions = {}
	messageID = 5967
}
