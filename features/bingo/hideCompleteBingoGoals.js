import Settings from "../../settings"

register("renderItemOverlayIntoGui", (item, x, y, e) => {
    if (item.getID() == 351 && item.getLore().includes('GOAL REACHED')) cancel(e) // item.getDamage() == 10
})

register("renderItemOverlayIntoGui")