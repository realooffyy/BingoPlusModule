import constants from "../utils/constants"

register("command", (code) => { 
    Client.showTitle("",`&${code}Splash in Hub 29`,0,5*20,0)
    ChatLib.chat(`${constants.PREFIX}&aSimulataing title!`)
} ).setName("showtitle").setAliases("")