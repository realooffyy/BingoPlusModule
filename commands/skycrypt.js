import constants from "../utils/constants"
import settings from "../settings"

const myUser = Player.getName()

register("command", (...args) => { 
    let username = args[0]
    let profile = args[1]
    if(username == undefined) username = myUser 
    if(profile == undefined) profile = ''
    link = `https://sky.shiiyu.moe/stats/${username}/${profile}`
    new TextComponent(`${constants.PREFIX}&aClick me to open &e${username}&a's SkyCrypt!`).setClick("open_url", link).chat()
    if (settings.skycrypt_auto_open) java.awt.Desktop.getDesktop().browse(new java.net.URL(link).toURI());
} ).setName("skycrypt").setAliases("sky")