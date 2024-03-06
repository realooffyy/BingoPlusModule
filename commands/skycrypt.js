//import settings from "../settings"
import constants from "../utils/constants"

const myUser = Player.getName()

register("command", (...args) => { 
    let username = args[0]
    if(args[0] == undefined) username = myUser 
    ChatLib.chat(`${constants.PREFIX}&aOpening ${username}&a's SkyCrypt!`)
    java.awt.Desktop.getDesktop().browse(new java.net.URL(`https://sky.shiiyu.moe/stats/${username}/${args[1]}`).toURI());
} ).setName("skycrypt").setAliases("sky")