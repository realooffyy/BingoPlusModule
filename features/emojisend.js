import settings from "../settings"
import constants from "../utils/constants"

register("messageSent", (e) => {
    ChatLib.chat();
}).setCriteria();