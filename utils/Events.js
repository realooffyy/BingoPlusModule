const S2EPacketCloseWindow = Java.type("net.minecraft.network.play.server.S2EPacketCloseWindow")
const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")
const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat")


const inventoryCloseFunctions = []
/**
 * Triggers when an inventory is closed
 * @param {Function} func
 */
export const onInventoryClose = (func) => inventoryCloseFunctions.push(func)

const triggerInventoryClose = () => inventoryCloseFunctions.forEach(func => func())

register("packetSent", triggerInventoryClose).setFilteredClass(C0DPacketCloseWindow)
register("packetReceived", triggerInventoryClose).setFilteredClass(S2EPacketCloseWindow)

const hypixelConnectFunctions = []
/**
 * Triggers when connecting to hypixel
 * @param {Function} func
 */
export const onHypixelConnect = (func) => hypixelConnectFunctions.push(func)

const triggerHypixelConnect = () => hypixelConnectFunctions.forEach(func => func())

register("serverConnect", () => {
    if (Server.getIP().includes("hypixel.net")) triggerHypixelConnect()
})

// from bloomcore
const chatFuncs = []

class ChatPacketEvent {

    constructor(func) {
        this.func = func
        this.criteria = null
        this.formatted = false // Event should run on formatted messages
        this.isActive = false
        this.register()
    }

    /**
     * 
     * @param {RegExp | String} criteria - The criteria. Capture groups are supported, and will be passed in before the event argument.
     * @returns 
     */
    setCriteria(criteria) {
        this.criteria = criteria
        
        // Test for color codes
        let rawCriteria = criteria
        if (criteria instanceof RegExp) rawCriteria.source
        this.formatted = /[§&]./g.test(rawCriteria)

        return this
    }

    trigger(msg, event) {
        // No criteria has been set, so the trigger is activated
        if (!this.criteria) {
            this.func(event)
            return
        }

        if (this.criteria instanceof RegExp) {
            const match = msg.match(this.criteria)
            if (!match) return
    
            this.func(...match.slice(1), event)
        }

        if (typeof(this.criteria) == "string" && msg == this.criteria) {
            this.func(event)
        }
    }

    isRegistered() {
        return this.isActive
    }

    register() {
        this.isActive = true
        if (!chatFuncs.includes(this)) chatFuncs.push(this)
        return this
    }

    unregister() {
        this.isActive = false
        const idx = chatFuncs.indexOf(this)
        if (idx !== -1) chatFuncs.splice(idx, 1)
        return this
    }
}

/**
 * @callback ChatPacketFunction
 * @param {...*} args
 * @param {CancellableEvent} event
 */

/**
 * 
 * @param {ChatPacketFunction} func The function to be run when the packet is received.
 * If the criteria regex contains capturing groups, will return those groups too. The final argument
 * will always be the packet received event. (Safe to cancel since it's a Chat packet) 
 * @returns {ChatPacketEvent}
 */
export const onChatPacket = (func) => {
    let trigger = new ChatPacketEvent(func).register()
    return trigger
}

register("packetReceived", (packet, event) => {
    if (packet.func_148916_d()) return

    const chatComponent = packet.func_148915_c()
    const formatted = chatComponent.func_150254_d()
    const unformatted = formatted.removeFormatting()

    chatFuncs.forEach(trigger => {
        if (trigger.formatted) trigger.trigger(formatted, event)
        else trigger.trigger(unformatted, event)
})
}).setFilteredClass(S02PacketChat)