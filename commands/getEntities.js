// temp command for debugging

register("command", () => {
    const { x, y, z } = Player
    World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).filter(player => Math.hypot(x - player.x, y - player.y, z - player.z) < 5).forEach(entity => {
        console.log(entity + entity.getUUID())
    })
    console.log('')
}).setName('getentities').setAliases('ge')