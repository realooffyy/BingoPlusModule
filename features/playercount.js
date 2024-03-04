import settings from "../settings"
import constants from "../utils/constants"

register("worldLoad", () => {
    let playerCount = World.getAllPlayers()

    //while (!(playerCount.startsWith("Players"))) {
    //    playerCount = TabList.getNames()[0];
    //}

    ChatLib.chat(`${constants.PREFIX}${playerCount}`);
});