import settings from "../settings"

const keybind = new KeyBind()

register("tick", () => {
    if (!settings.chicken_head_timer) return
    const helmet = Player.armor.getHelmet().getName()
    //ChatLib.chat(helmet)
    if (helmet.includes("Chicken Head")) {
        const display = new Display();
        display.addLine("Chicken Head Timer: ");
    }
})

yourKeyb.registerKeyPress(() => {
    // do stuff
  })

