import { drawStringWithShadow } from "../../render/utils"
import { registerWhen } from "../../utils/utils"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"

let bones = []
let enabled = false

const reset = () => {
    bones = []
}

register("command", () => {
    World.getAllEntitiesOfType(net.minecraft.entity.item.EntityItem)
        .forEach(item => {
            if (item.name !== "item.item.bone") return
            ChatLib.chat(item.getUUID())
        })
}).setName("getBones")

register("tick", () => {
    enabled = Skyblock.area === "Spider's Den" && settings().timerOverBones
})

// bone manager
register("tick", () => {
    if (!enabled) return reset()

    const entities = World.getAllEntitiesOfType(net.minecraft.entity.item.EntityItem)

    entities.forEach(item => {
        if (item.name !== "item.item.bone") return
        // update existing bones
        let index = bones.findIndex(bone => bone.uuid === item.getUUID())
        if (index !== -1) {
            bones[index].item = item
            return 
        }
        
        bones.push({
            text: "",
            item: item,
            uuid: item.getUUID(),
            timer: 5.0
        })
    })
    
    // remove bones that are no longer in the world
    bones.forEach(bone => {
        if (!entities.includes(bone.item)) {
            bones.splice(bones.indexOf(bone), 1)
            return
        }


        bone.timer -= 0.05

        // -30 to ensure the bone is absolutely gone lol
        if (bone.timer <= -30) {
            bones.splice(bones.indexOf(bone), 1)
        }
    })
})

registerWhen(register("renderWorld", () => {
    bones.forEach(bone => {
        let text, colour
        if (bone.timer <= 0) {
            text = "!!!"
            colour = [1, 0, 0]
        } else if (bone.timer <= -5) {
            text = "..?"
            colour = [1, 1, 0]
        } else {
            text = bone.timer.toFixed(1)
            colour = [1, 1, 1]
        }
        

        drawStringWithShadow(
            text,
            bone.item.getX(),
            bone.item.getY() + 2,
            bone.item.getZ(),
            3,
            colour
        )
    })
}), () => enabled && bones.length > 0)
