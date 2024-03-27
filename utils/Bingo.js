import Settings from "../settings"
import Skyblock from "./Skyblock"

export default new class Bingo {
    constructor() {
        this.inBingo = false

        register("tick", (t) => {
            if (t%10 || !Skyblock.inSkyblock) return
            let displayName = Player.getDisplayName().text
            this.inBingo = displayName.includes("Ⓑ")
            this.enabled = this.inBingo || !Settings.onlyOnBingo
        })
    }
}