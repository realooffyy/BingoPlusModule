import settings from "../settings";
import constants from "../utils/constants";
import Party from "../utils/Party"

register("command", () => {
  ChatLib.chat(`${constants.PREFIX}&aJoining Bingo party.`);
  ChatLib.command(`p join ${Party.getBotIGN()}`);
})
  .setCommandName("pb")
  .setAliases(settings().partyJoinAlias);
