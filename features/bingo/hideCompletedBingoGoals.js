import Settings from "../../Settings"
import { registerWhen } from "../../utils/utils"

registerWhen(register("renderItemIntoGui", (item, x, y, e) => {
    if (item.getID() == 351 && item.getLore().includes('§5§o§aGOAL REACHED')) cancel(e) // item.getDamage() == 10
}), () => Settings.hideCompletedBingoGoals)