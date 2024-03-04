//import settings from "../settings"
import constants from "../utils/constants"

register("command", (...args) => { 
    ChatLib.chat(`${constants.PREFIX}https://sky.shiiyu.moe/stats/${args[0]}/${args[1]}`)
} ).setName("skycrypt").setAliases("")