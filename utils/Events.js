const S2EPacketCloseWindow = Java.type("net.minecraft.network.play.server.S2EPacketCloseWindow")
const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")


const inventoryCloseFunctions = []
/**
 * Triggers when an inventory is closed
 * @param {Function} func
 */
export const onInventoryClose = (func) => inventoryCloseFunctions.push(func)

const triggerInventoryClose = () => inventoryCloseFunctions.forEach(func => func())

register("packetSent", triggerInventoryClose).setFilteredClass(C0DPacketCloseWindow)
register("packetReceived", triggerInventoryClose).setFilteredClass(S2EPacketCloseWindow)