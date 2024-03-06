import settings from "../settings"
import constants from "../utils/constants"

const PREFIX = constants.PREFIX
/*
const maxwell_lines = {
    "Select an option: [Ok, then what?] ": "selectnpcoption thaumaturgist x_2",
    "Select an option: [Magical power?] ": "selectnpcoption thaumaturgist x_2",
    "Select an option: [That's amazing!] ": "selectnpcoption thaumaturgist x_7"
}

const sam_lines = {
    "Help her out? [YES] [NO] ": "selectnpcoption sam_assistant yes",
    "Collect Wheat for Sam?\n[That's a great idea] [I'd rather not] ": "/selectnpcoption sam yes",
    "Sell leftover Wheat? \n [Good call!] [I'd rather keep it for myself] ": "/selectnpcoption sam_composter yes"
}

const pesthunter_phillip_lines = {
    "Select an option: [What's a pest?] ": "/selectnpcoption pesthunter_phillip x_2"
}

const lone_adventurer_lines = {
    "Select an option: [YES] [NO] ": ["selectnpcoption lone_adventurer yes", "selectnpcoption lone_adventurer_2 yes"]
}
*/

// Maxwell skipper

register("chat", (e) => {
    if(!settings.maxwell) return
    ChatLib.say("/selectnpcoption thaumaturgist x_2");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [Ok, then what?] ");

register("chat", (e) => {
    if(!settings.maxwell) return
    ChatLib.say("/selectnpcoption thaumaturgist x_5");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [Magical power?] ");

register("chat", (e) => {
    if(!settings.maxwell) return
    ChatLib.say("/selectnpcoption thaumaturgist x_7");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [That's amazing!] ");

// Sam skipper

register("chat", (e) => {
    if(!settings.sam) return
    ChatLib.say("/selectnpcoption sam_assistant yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Help her out? [YES] [NO] ");

register("chat", (e) => {
    if(!settings.sam) return
    ChatLib.say("/selectnpcoption sam yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Collect Wheat for Sam?\n[That's a great idea] [I'd rather not] ");

register("chat", (e) => {
    if(!settings.sam) return
    ChatLib.say("/selectnpcoption sam_composter yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Sell leftover Wheat? \n [Good call!] [I'd rather keep it for myself] ");

// Pesthunter Phillip skipper

register("chat", (e) => {
    if(!settings.pesthunter_phillip) return
    ChatLib.say("/selectnpcoption pesthunter_phillip x_2");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [What's a pest?] ");

// Lone Adventurer skipper

register("chat", (e) => {
    if(!settings.lone_adventurer) return
    ChatLib.say("/selectnpcoption lone_adventurer yes");
    ChatLib.say("/selectnpcoption lone_adventurer_2 yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [YES] [NO] ");


