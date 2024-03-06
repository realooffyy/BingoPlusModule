import settings from "../../settings";
import constants from "../../utils/constants"
import { isOnBingo } from "../../utils/bingoCheck";

const blockMsg = new Message(new TextComponent(`${constants.PREFIX}&cBlocked &e/openbaker &con &6Bingo! &aClick to open &e/profiles&a!`).setClick("run_command", "/profiles"))

register("messageSent", (message, event) => {
    
    if (!settings.baker_blocker || !isOnBingo()) return
    if (message === "/openbaker") {
      cancel(event)
      ChatLib.chat(blockMsg)
    }
  });

  