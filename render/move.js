import Settings from "../settings"

const txt = 'Drag to move'
let move = false

register("renderOverlay", () => {
    move = (Settings.hubSelectorDisplayMove.isOpen() ||
            Settings.splasherDisplayMove.isOpen() ||
            Settings.chickenHeadTimerMove.isOpen() ||
            Settings.communityGoalDisplayMove.isOpen())
            
    if (move)
    {
        Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2)
    }
    
})