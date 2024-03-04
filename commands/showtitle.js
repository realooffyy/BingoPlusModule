import constants from "../utils/constants"

register("command", (title="",subtitle="") => { 
    Client.showTitle(title,subtitle,0,5*20,0)
    ChatLib.chat(`${constants.PREFIX}&aSimulataing title!`)
} ).setName("showtitle")