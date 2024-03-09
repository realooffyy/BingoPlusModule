//import settings from "../settings"
import constants from "../utils/constants"

const myUser = Player.getName()

register("command", (...args) => { 
    let username = args[0]
    let profile = args[1]
    if(username == undefined) username = myUser 
    if(profile == undefined) profile = '' 
    link = `https://sky.shiiyu.moe/stats/${username}/${profile}`
    new TextComponent(`${constants.PREFIX}&aOpening ${username}&a's SkyCrypt!`).setClick("open_url", link).chat()
    java.awt.Desktop.getDesktop().browse(new java.net.URL(link).toURI());
} ).setName("skycrypt").setAliases("sky")