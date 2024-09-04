import { BaseGui } from "../../render/BaseGui"
import { registerGui } from "../../render/registerGui"
import { drawTextBox, getStringHeight, getStringWidth, highlightSlot } from "../../render/utils"
import settings from "../../settings"
import constants from "../../utils/constants"
import Skyblock from "../../utils/Skyblock"
import { registerWhen } from "../../utils/utils"
import { onInventoryClose } from "../../utils/Events"

const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")

const hubSelectorWindowTitles = ["SkyBlock Hub Selector", "Dungeon Hub Selector"]
const hubSlots = [
    10, 11, 12, 13, 14, 15, 16,
    19, 20, 21, 22, 23, 24, 25,
    28, 29, 30, 31, 32, 33, 34,
    37, 38, 39, 40, 41, 42, 43
]

const itemNameRegex = /^§(a|c)(Dungeon|SkyBlock) Hub #(\d{1,2})$/
// https://regex101.com/r/b8Gx1Q/2
const playersRegex = /§5§o§7Players: (\d{1,2})\/(\d{1,2})/
// https://regex101.com/r/GnWTYM/1
const serverRegex = /^§5§o§8Server: (.*)$/
// https://regex101.com/r/ksK6DK/2

let hubSelectorGui = new BaseGui('hubSelectorDisplay', ['hubSelectorDisplay', 'hubSelector', 'lowesthub'])
registerGui(hubSelectorGui)

let inHubSelector = false
let loaded = false

let text = ''
let width = 100
let height = 100

let hubs = []
let bestHubs = []

// hub selector check
register("packetReceived", (packet) => {
    if (!Skyblock.inSkyblock) return
    inHubSelector = hubSelectorWindowTitles.includes(packet.func_179840_c().func_150254_d().removeFormatting())
    loaded = false
}).setFilteredClass(S2DPacketOpenWindow)

// reset manager
const reset = () => {
    inHubSelector = false
    loaded = false
}
onInventoryClose(reset)
register("worldUnload", reset)

register("tick", () => {
    if (!Skyblock.inSkyblock) return
    if (!(settings().hubSelectorDisplay ||
          settings().hubRestartWarning || 
          settings().hubSelectorHighlightBestHubs)) return
    if (!inHubSelector || loaded) return

    hubs = getHubsFromInventory()
    if (!hubs) return

    processData(hubs)
    loaded = true
})

// render (hub selector display)
registerWhen(register('guiRender', () => {
    drawTextBox(text, 'hubSelectorDisplay', height, width)
}), () => loaded && settings().hubSelectorDisplay)

// render (hub selector display move)
registerWhen(register('renderOverlay', () => {
    drawTextBox('&e&lHub Selector', 'hubSelectorDisplay', 100, 80)
}), () => hubSelectorGui.isOpen())

// render (highlight best hubs)
registerWhen(register("guiRender", () => {
    if (!settings().hubSelectorHighlightBestHubs) return
    let rgba = [0, 0, 0, 255]
    bestHubs.forEach(hub => {
        if (hub.colour === 'c') rgba = [255, 0, 0, 255]
        if (hub.colour === 'a') rgba = [0, 255, 0, 255]
        highlightSlot(hub.slotNumber, rgba)  
    })
}), () => loaded)

// feature (Copy hub details when clicked)
register("guiMouseClick", () => {
    if (![1, 2].includes(settings().splashMessageCopyWhenClickingHub) || !inHubSelector) return

    // splash potion check
    if (!Player.getContainer().getItems().some(item => 
        item && item.getName().includes('Splash Potion')))
    return

    // get hub
    const hub = getHubFromItem(Client.currentGui.getSlotUnderMouse()?.getItem())
    if (!hub) return

    const hubText = `${hub.area == 'Dungeon' ? 'Dungeon ' : ''}Hub ${hub.number} (${hub.serverName})`
    
    const text =
        FileLib.read("BingoPlus", constants.SPLASHMESSAGE_FOLDER + constants.SPLASHMESSAGE_FILE)
            .replaceAll('{hub}', hub.number)
            .replaceAll('{dungeon?}', hub.area == 'Dungeon' ? 'Dungeon ' : '')
            .replaceAll('{server}', hub.serverName)
            .replaceAll('{username}', Player.getName())

            .replaceAll('{bbping}',  '@Splash Pings')
            .replaceAll('{bscping}', '@human')
            .replaceAll('{spaping}', '@Splash Ping')
            .replaceAll('{iodping}', '@Splash')

            .replaceAll('{jbaping}', '@2mmwjba')
       
    if (!text) ChatLib.chat(`${constants.PREFIX}&cFailed to read &rSplashMessage.txt&c, or it is empty.`)
    
    switch (settings().splashMessageCopyWhenClickingHub) {
        case 1:
            ChatLib.command(`b+ copy splash_message ${text}`, true)
            break
        case 2:
            new TextComponent(`${constants.PREFIX}Click to copy splash message for &a${hubText}&r!`)
                .setClickAction("run_command")
                .setClickValue(`/b+ copy splash_message ${text}`)
                .chat()
    }
    new TextComponent(`${constants.PREFIX}Click to put &a${hubText} &rin chat`)
        .setHoverValue(`Click to put &a${hubText} &rin chat`)
        .setClickAction("run_command")
        .setClickValue(`/b+ addtochatbox ${hubText}`)
        .chat()
})

// feature (Warn if mega)
register("chat", (server) => {
    if (!settings().hubSelectorWarnIfMega) return
    if (server.slice(0, 4) === "mega")
        ChatLib.chat(`${constants.PREFIX}&aYou're warping into a mega hub! (${server})`)
}).setCriteria("Request join for Hub ${server}...")


/**
 * Attempts to get all the hubs within the hub selector menu
 * @returns array if successful, undefined if not
 */
function getHubsFromInventory() {
    const inv = Player.getContainer()

    let hubs = []

    // for slot number
    let counter = 0

    hubSlots.map(slot => inv.getItems()[slot]).forEach(item => {
        if (item == null) return

        const hub = getHubFromItem(item)
        if (!hub) return

        // append slot number
        hub.slotNumber = hubSlots[counter]
        counter++

        hubs.push(hub)
    })

    if (hubs.length == 0) return

    // sorts hubs by size
    hubs = sort(hubs, "freeSlots")

    return hubs
}

/**
 * does all the cool stuff after getting all the hubs
 * @param {*} hubs 
 */
function processData(hubs) {
    // ik the lines still process when the hub selector display is disabled but i cba to change it now
    let lines = []
    let line = ''

    bestHubs = []
    let otherHubs = []
    lines.push('&e&lHub Selector')
    lines.push('')

    const bestFreeSlots = hubs[0].freeSlots 
    for (let i = 0; i < settings().hubSelectorDisplayTopHubs; i++) {
        const hub = hubs[i]

        if (hub.freeSlots == bestFreeSlots) bestHubs.push(hub)
        else otherHubs.push(hub)
    }

    if (settings().hubSelectorDisplay) {
    // best hub line
    line = bestHubs.map(hub => `&${hub.colour}&l${hub.number}`).join("&7, ")
    lines.push(`${line} &3| &e${bestFreeSlots} slots &a&lBEST!`)  

    // other hub lines
    if (otherHubs.length != 0) {
        lines.push('') // empty line
        otherHubs.forEach(hub => {
            lines.push(`&${hub.colour}${hub.number} &3| &7${hub.freeSlots} slots`)
        })
    }

    // restarting hub lines using 0/0 detection
    restartingHubs = 0
    hubs.forEach(hub => {
        if (hub.players == 0 && hub.maxPlayers == 0) restartingHubs++
    })
    if (restartingHubs > 0) {
        lines.push('')
        line = [
            `&cDetected ${restartingHubs} restarting hub${restartingHubs > 1 ? 's' : ''}.`,
            '&eThis may cause them to shift,',
            '&eplease wait before choosing',
            '&ea hub to splash in.'
        ]
        line.forEach(element => {
            lines.push(element)
        })
        if (settings().hubRestartWarning) ChatLib.chat(constants.PREFIX + line.join(' '))
    }
    
    // final text operations

    text = lines.join('\n')
    height = getStringHeight(text)
    width = getStringWidth(text)
    
    }
}

/**
 * Attempts to extract the hub's data from a hub selector item
 * @param {Item} item item from the hub selector menu
 * @returns hub object if successful, undefined if not
 */
function getHubFromItem(item) {
    if (!item) return
    
    let match
    // name regex
    match = item.getName().match(itemNameRegex)
    if (!match) return

    const hub = {
        colour: null,

        area: null,

        number: null,
        serverName: null,

        players: null,
        maxPlayers: null,
        freeSlots: null
    }

    hub.colour = match[1]
    hub.area = match[2]
    hub.number = match[3]

    // lore regex
    item.getLore().forEach(line => {
        match = line.match(playersRegex)
        if (match) [_, hub.players, hub.maxPlayers] = match
        match = line.match(serverRegex)
        if (match) [_, hub.serverName] = match
    })

    // calculate free slots
    if (hub.maxPlayers != null || hub.players != null)
    hub.freeSlots = hub.maxPlayers - hub.players

    // if any values are still null, return
    if (Object.values(hub).some(value => value === null)) return

    return hub
}

/**
 * sorts array by internal object property
 */
function sort(arr, property) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j][property] < arr[j + 1][property]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}