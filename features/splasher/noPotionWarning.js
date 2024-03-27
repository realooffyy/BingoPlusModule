import Skyblock from "../../utils/Skyblock"
import Settings from "../../settings"
import Bingo from "../../utils/Bingo"

register("step", () => {
    if (!Settings.noPotionsWarning || !Skyblock.inSkyblock || Bingo.inBingo) return
    if (Skyblock.subArea !== 'Pet Care' || !Skyblock.server.startsWith('M')) return
    
    let found = false

    const inv = Player.getInventory().getItems()
    inv.forEach(x => {
        if (x == null) return
        let item = x.getName()
        if (item.includes('Splash Potion')) {return found = true}
    })

    if (found) return
    Client.showTitle('','&cNo splash potions in inventory!',0,80,0)
    World.playSound('note.pling', 100, 0)
    // https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/mapping-and-modding-tutorials/2213619-1-8-all-playsound-sound-arguments
    
}).setDelay(5)