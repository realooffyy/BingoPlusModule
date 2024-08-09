/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

// uhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

/*

import Bingo from "../../utils/Bingo"
import Skyblock from "../../utils/Skyblock"
import constants from "../../utils/constants"

const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")

//let inv = []

Client.showTitle('', '', 0, 1, 0)

register('packetReceived', (packet) => {
    if (Skyblock.area !== 'Dungeon' || !Bingo.inBingo) return

    const itemStack = packet.func_149174_e()
    const slot = packet.func_149173_d()
    const windowId = packet.func_149175_c()
    if (windowId !== 0) return // !0 -> external container open

    //if (inv[slot] == null) inv[slot] = false
    //console.log(slot + ' is ' + inv[slot])

    if (itemStack) {
        let item = new Item(itemStack)
        //ChatLib.chat(item.getName())
        if (item.getName().includes('Dreadlord Sword')) {
            //if (!inv[slot]) {
                //inv[slot] = true
                Client.showTitle('&cDREADLORD SWORD!', '', 0, 3*20, 0) 
                World.playSound('random.levelup', 100, 0)
                ChatLib.chat(`${constants.PREFIX}&aYou got a Dreadlord Sword!`)
            //}
        }
        //else {
        //    inv[slot] = false
        //}
    }
}).setFilteredClass(S2FPacketSetSlot)

*/