import Settings from "../../settings";
import constants from "../../utils/constants"
import Bingo from "../../utils/Bingo";

const blockMsg = new Message(new TextComponent(`${constants.PREFIX}&cBlocked &e/openbaker &con &6Bingo! &aClick to open &e/profiles&a!`).setClick("run_command", "/profiles"))

register("messageSent", (message, event) => {
    
    if (!Settings.baker_blocker || !Bingo.inBingo) return
    if (message === "/openbaker") {
      cancel(event)
      ChatLib.chat(blockMsg)
    }
  });

  