import Settings from "../settings"
import constants from "../utils/constants"

PREFIX = constants.PREFIX

// im bad at js please forgive me

// Maxwell skipper

register("chat", (e) => {
    if(!Settings.maxwell) return
    ChatLib.say("/selectnpcoption thaumaturgist x_2");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [Ok, then what?] ");

register("chat", (e) => {
    if(!Settings.maxwell) return
    ChatLib.say("/selectnpcoption thaumaturgist x_5");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [Magical power?] ");

register("chat", (e) => {
    if(!Settings.maxwell) return
    ChatLib.say("/selectnpcoption thaumaturgist x_7");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [That's amazing!] ");

// Sam skipper

register("chat", (e) => {
    if(!Settings.sam) return
    ChatLib.say("/selectnpcoption sam_assistant yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Help her out? [YES] [NO] ");

register("chat", (e) => {
    if(!Settings.sam) return
    ChatLib.say("/selectnpcoption sam yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Collect Wheat for Sam?\n[That's a great idea] [I'd rather not] ");

register("chat", (e) => {
    if(!Settings.sam) return
    ChatLib.say("/selectnpcoption sam_composter yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Sell leftover Wheat? \n [Good call!] [I'd rather keep it for myself] ");

// Pesthunter Phillip skipper

register("chat", (e) => {
    if(!Settings.pesthunter_phillip) return
    ChatLib.say("/selectnpcoption pesthunter_phillip x_2");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [What's a pest?] ");

// Lone Adventurer skipper

register("chat", (event) => {
    if(!Settings.lone_adventurer) return
    ChatLib.say("/selectnpcoption lone_adventurer yes");
    ChatLib.say("/selectnpcoption lone_adventurer_2 yes");
    ChatLib.chat(PREFIX+"&aSkipped dialogue!");
}).setCriteria("Select an option: [YES] [NO] ");

