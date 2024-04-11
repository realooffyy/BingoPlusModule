import Settings from "../settings"
import Skyblock from "./Skyblock"
import { data, goalSlots } from "./constants"

export default new class Bingo {
    constructor() {
        this.inBingo = null
        this.goals = null

        register("tick", (t) => {
            if (t%10 || !Skyblock.inSkyblock) return
            let displayName = Player.getDisplayName().text
            this.inBingo = displayName.includes("Ⓑ")
            this.enabled = this.inBingo || !Settings.onlyOnBingo
        })

        register("postGuiRender", () => {
            if (!Skyblock.inSkyblock) return
            if (!Settings.communityGoalDisplay || !Settings.bingoCardDisplay) return
            let inv = Player.getContainer()
            if (inv?.getName() == "Bingo Card") {
                let guiLoaded = register("tick", (t) => {

                    let closeListener = register("guiClosed", () => {
                        guiLoaded?.unregister()
                        closeListener?.unregister()
                        refresh?.unregister()
                    })

                    if (inv?.getStackInSlot(inv?.getSize() - 37) == null) return

                    guiLoaded.unregister()

                    let refresh = register("step", () => {
                        goalSlots.community.map(slot => { // https://regex101.com/r/FzKlfa/1
                            //if (!inv.getItems()[slot].getName()) console.log("a")
                        })
                        //this.goals = goalSlots.all.map(slot => inv.getItems()[slot])
                    }).setFps(1)
                    
                })
            }
        })

        register("worldLoad", () => this.reset())
    }
    reset() {
        this.inBingo = null
        this.enabled = null
    }


}
