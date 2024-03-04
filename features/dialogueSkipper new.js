import settings from "../settings";
import constants from "../utils/constants";

const maxwell_lines = {
    "Select an option: [Ok, then what?] ": ["selectnpcoption thaumaturgist x_2"],
    "Select an option: [Magical power?] ": ["selectnpcoption thaumaturgist x_2"],
    "Select an option: [That's amazing!] ": ["selectnpcoption thaumaturgist x_7]"]
}

const sam_lines = {
    "Help her out? [YES] [NO] ": ["selectnpcoption sam_assistant yes"],
    "Collect Wheat for Sam?\n[That's a great idea] [I'd rather not] ": ["selectnpcoption sam yes"],
    "Sell leftover Wheat? \n [Good call!] [I'd rather keep it for myself] ": ["selectnpcoption sam_composter yes"]
}

const pesthunter_phillip_lines = {
    "Select an option: [What's a pest?] ": ["selectnpcoption pesthunter_phillip x_2"]
}

const lone_adventurer_lines = {
    "Select an option: [YES] [NO] ": ["selectnpcoption lone_adventurer yes", "selectnpcoption lone_adventurer_2 yes"]
}


const npcDialogueOptions = {
    "maxwell": maxwell_lines,
    "sam": sam_lines,
    "pesthunter_phillip": pesthunter_phillip_lines,
    "lone_adventurer": lone_adventurer_lines
    // Add other NPCs here if needed
}

function registerChatEvent(npcName, dialogueOptions) {
    for (const [criteria, actions] of Object.entries(dialogueOptions)) {
        ChatLib.chat(criteria)
        register("chat", (e) => {
            ChatLib.chat(`got ${criteria}`)
            if (!settings[npcName]) return
            actions.forEach(action => { ChatLib.command(action) })
            ChatLib.chat(constants.PREFIX + "&aSkipped dialogue!")
        }).setCriteria(criteria)
    }
}

for (const [npcName, dialogueOptions] of Object.entries(npcDialogueOptions)) {
    registerChatEvent(npcName, dialogueOptions)
    
}
