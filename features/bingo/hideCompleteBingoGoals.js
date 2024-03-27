import Settings from "../../settings"

register("renderItemIntoGui", (item, x, y, e) => {
    let inv = Player.getContainer()
    if (!Settings.hideCompletedBingoGoals || !inv.getName().includes('Bingo Card')) return
    if (item.getID() == 351 && item.getDamage() == 10) cancel(e)
})