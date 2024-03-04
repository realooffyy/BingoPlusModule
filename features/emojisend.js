import settings from "../settings"
import constants from "../utils/constants"

register("messageSent", (message) => {
    ChatLib.chat();
}).setCriteria();