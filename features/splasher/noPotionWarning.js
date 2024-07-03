import Skyblock from "../../utils/Skyblock"
import Settings from "../../Settings"
import Bingo from "../../utils/Bingo"

register("step", () => {
    if (!Settings.noPotionsWarning || !Skyblock.inSkyblock || Bingo.inBingo) return
    if (Skyblock.subArea !== 'Pet Care' || Skyblock.serverType !== 'M') return

    const inv = Player.getInventory().getItems()
    inv.forEach(x => {
        if (x == null) return
        let item = x.getName()
        if (item.includes('Splash Potion')) {
            for (let i = 0; i < 2; i++) {
                Client.showTitle('','&cNo splash potions in inventory!',0,80,0)
            }
            World.playSound('note.pling', 100, 0)
            // https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/mapping-and-modding-tutorials/2213619-1-8-all-playsound-sound-arguments
            return
        }
    })

}).setDelay(5)

// todo: fix this i broke it smoehow