//import settings from "../settings"
import constants from "../utils/constants"

register("command", (...args) => { 
    //ChatLib.chat(`${constants.PREFIX}https://sky.shiiyu.moe/stats/${args[0]}/${args[1]}`)
    ChatLib.chat(`${constants.PREFIX}&aOpened ${args[0]}'s SkyCrypt!`)
    java.awt.Desktop.getDesktop().browse(new java.net.URL(`https://sky.shiiyu.moe/stats/${args[0]}/${args[1]}`).toURI());
} ).setName("skycrypt").setAliases("")
