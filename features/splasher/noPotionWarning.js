import Skyblock from "../../utils/Skyblock"
import settings from "../../settings"
import Bingo from "../../utils/Bingo"

register("step", () => {
    if (!settings.no_potions_warning || !Skyblock.inSkyblock || Bingo.inBingo) return
    if (Skyblock.subArea !== 'Pet Care') return
    
    let found = false

    const inv = Player.getInventory().getItems()
    inv.forEach(x => {
        if (x == null) return
        let item = x.getName()
        if (item.includes('Splash Potion')) {return found = true}
    })

    if (found) return
    Client.showTitle('','&cNo splash potions in inventory!',0,80,0)
    World.playSound('mob.zombie.hurt', 100, 0)
    
}).setDelay(5)