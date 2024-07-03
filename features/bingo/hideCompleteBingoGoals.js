import Settings from "../../Settings"
import { registerWhen } from "../../utils/utils"

registerWhen(register("renderItemOverlayIntoGui", (item, x, y, e) => {
    if (item.getID() == 351 && item.getLore().includes('GOAL REACHED')) cancel(e) // item.getDamage() == 10
}), () => Settings.hideCompletedBingoGoals)

// doc my beloved