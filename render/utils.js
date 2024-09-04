import { data } from "../utils/constants"
import { getSlotLocation } from "../utils/utils"
import renderBeaconBeam from "../../BeaconBeam"
import RenderLibV2 from "../../RenderLibV2"

// 2D

/**
 * Gets width of a string
 * @param {String} - the string to get the width of
 */
export const getStringWidth = text => {
    let width = 1
    text.split('\n').forEach(line => {
        const lineWidth = Renderer.getStringWidth(line)
        width = Math.max(width, lineWidth)
    })
    return width
}
/**
 * Gets height of a string
 */
export const getStringHeight = text => text.split('\n').length * 9


/**
 * Draws a text box
 * @param {String} - the string to render
 * @param {String} - the Pogdata property name to get coordinates and scale from
 * @param {Boolean} - draw a box behind the text
 * @param {Number} - height of text
 * @param {Number} - width of text
 * @param {Number} - border size
 */
export function drawTextBox(text, dataName, height = 100, width = 100, alpha = 80, border = 5) {
    const guiX = data[dataName].x
    const guiY = data[dataName].y
    const guiScale = data[dataName].scale
    const guiHeight = height * guiScale
    const guiWidth = width * guiScale
    const guiBorder = border * guiScale

    const rectangle = new Rectangle(Renderer.color(0, 0, 0, alpha), guiX-guiBorder, guiY-guiBorder, guiWidth+(guiBorder*2), guiHeight+(guiBorder*2))
    rectangle.draw()

    Renderer.translate(guiX, guiY)
    Renderer.scale(guiScale)
    Renderer.drawStringWithShadow(text, 0, 0)
}

/**
 * Draws centered text
 * @param {String} - the string to render
 * @param {String} - the Pogdata property name to get coordinates and scale from
 * @param {Number} - width of text
 */

export function drawCenteredText(text, dataName, width) {
    const guiScale = data[dataName].scale
    const guiX = data[dataName].x - ((width/2)*guiScale)
    const guiY = data[dataName].y

    Renderer.translate(guiX, guiY)
    Renderer.scale(guiScale)
    Renderer.drawStringWithShadow(text, 0, 0)
}

/**
 * Highlights a GUI slot (from alonaddons)
 * @param {Number} slot slot number
 * @param {Array} rgba an rgba array
 */
export const highlightSlot = (slot, rgba) => {
    // From AlonAddons
    let renderX, renderY
    [renderX, renderY] = getSlotLocation(slot)

    drawSlotBox(renderX - 8, renderY - 8, 247, rgba )
}

/**
 * Draws a box on a slot, under the item
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @param {Number} z z coordinate
 * @param {Array} rgba an rgba array
 */
export const drawSlotBox = (x, y, z = 247, rgba) => {
    Renderer.translate(x, y, z)
    Renderer.drawRect(rgba ? Renderer.color(rgba[0], rgba[1], rgba[2], rgba[3]) : Renderer.color(0, 255, 0, 255), 0, 0, 16, 16)
}

// 3D

/**
 * Traces a line from the player's crosshair to a coordinate
 * Code from Coleweight
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @param {Number} z z coordinate
 * @param {Number} red red value 0-255
 * @param {Number} green green value 0-255
 * @param {Number} blue blue value 0-255
 * @param {Number} alpha alpha value 0-255
 * @param {Number} lineWidth default is 3
 */
export const trace = (x, y, z, red, green, blue, alpha, lineWidth=3) => {
    if(Player.isSneaking()) RenderLibV2.drawLine(Player.getRenderX(), Player.getRenderY() + 1.54, Player.getRenderZ(), x, y, z, red, green, blue, alpha, true, lineWidth)
    else RenderLibV2.drawLine(Player.getRenderX(), Player.getRenderY()+1.62, Player.getRenderZ(), x, y, z, red, green, blue, alpha, true, lineWidth)
}

/**
 * Renders a waypoint in the world
 * Code partially from SoopyV2, copied from BingoHelper (with permission)
 * @param {String} text 
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @param {Number} z z coordinate
 * @param {Number} red red value 0-255
 * @param {Number} green green value 0-255
 * @param {Number} blue blue value 0-255
 * @param {Number} scale
 * @param {Number} radius start hiding at this distance
 * @param {Boolean} box draw the box
 * @param {Boolean} beam render beacon beam
 * @param {Boolean} beamDepth false: show beam through walls
 * @param {Boolean} drawLine trace line from crosshair
 */
export const renderWaypoint = (text, x, y, z, r, g, b, scale, radius, box=true, beam=true, beamDepth=false, drawLine=false) => {
    let scaleSubtractionBase = 10 * scale
    const distToPlayerSq = (x - Player.getRenderX()) ** 2 + (y - (Player.getRenderY() + Player.getPlayer()["func_70047_e"]())) ** 2 + (z - Player.getRenderZ()) ** 2
    const distToPlayer = Math.sqrt(distToPlayerSq)
    const distRender = Math.min(distToPlayer, 20)
    const alpha = Math.min(225 / 255, (distToPlayerSq - 25) / 100) * Math.min(1, Math.max(0, 1 - (distToPlayerSq - 10000) / 12500))
    const [titleX, titleY, titleZ] = [Player.getRenderX() + (x + 0.5 - Player.getRenderX()) / (distToPlayer / distRender), Player.getRenderY() + Player.getPlayer()["func_70047_e"]() + (y + 1 + 30 * distToPlayer / (distRender * 10) - (Player.getRenderY() + Player.getPlayer()["func_70047_e"]())) / (distToPlayer / distRender), Player.getRenderZ() + (z + 0.5 - Player.getRenderZ()) / (distToPlayer / distRender)]
    const [subtitleX, subtitleY, subtitleZ] = [Player.getRenderX() + (x + 0.5 - Player.getRenderX()) / (distToPlayer / distRender), Player.getRenderY() + Player.getPlayer()["func_70047_e"]() + (y + 1 + 30 * distToPlayer / (distRender * 10) - scaleSubtractionBase * distToPlayer / (distRender * 10) - (Player.getRenderY() + Player.getPlayer()["func_70047_e"]())) / (distToPlayer / distRender), Player.getRenderZ() + (z + 0.5 - Player.getRenderZ()) / (distToPlayer / distRender)]
    if(distToPlayer > radius) {
        if (box) RenderLibV2.drawInnerEspBox(x + .5, y, z + .5, 1, 1, 206, 137, 0, alpha, true)
        if (beam) renderBeaconBeam(x, y, z, 85 / 255, 255 / 255, 85 / 255, alpha, beamDepth)
        if (drawLine) trace(x + 0.5, y + 1, z + 0.5, 0, 255, 255, 255)
        if (Client.settings.getSettings().field_74320_O === 2) return
        drawStringWithShadow(text.split('§').join(''), titleX, titleY - 2.4, titleZ, 2, [r / 255, g / 255, b / 255])
        drawStringWithShadow(`(${Math.floor(distToPlayer)}m)`, subtitleX, subtitleY - 1.95, subtitleZ, 2, [85 / 255, 255 / 255, 85 / 255])
    }
}

const UMatrixStack = Java.type("gg.essential.universal.UMatrixStack");
const Color = Java.type("java.awt.Color");
const UGraphics = Java.type("gg.essential.universal.UGraphics");
const DefaultFonts = Java.type("gg.essential.elementa.font.DefaultFonts")
const ElementaFonts = Java.type("gg.essential.elementa.font.ElementaFonts")

/**
 * Draws a string with shadow in the world
 * Code from Noamm9
 * @param {String} string text to draw
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @param {Number} z z coordinate
 * @param {Number} scale
 * @param {Array} color rgb array 0-1
 */
export const drawStringWithShadow = (string, x, y, z, scale, color) => {

    GlStateManager.func_179097_i() //disableDepth

    const matrixStack = new UMatrixStack();
    const x1 = x - Player.getRenderX();
    const y1 = y - Player.getRenderY();
    const z1 = z - Player.getRenderZ();
    const f1 = 0.0266666688;
    const width = Renderer.getStringWidth(string) / 2;
    matrixStack.push();
    matrixStack.translate(x1, y1, z1);
    GL11.glNormal3f(0, 1, 0);
    
    matrixStack.rotate(-Player.getYaw(), 0.0, 1.0, 0.0);
    matrixStack.rotate(Player.getPitch(), 1.0, 0.0, 0.0);
    matrixStack.scale(-f1, -f1, -f1);
    UGraphics.disableLighting();
    UGraphics.depthMask(false);
    UGraphics.enableBlend();
    UGraphics.tryBlendFuncSeparate(770, 771, 1, 0);

    const worldRenderer = UGraphics.getFromTessellator();
    worldRenderer.beginWithDefaultShader(UGraphics.DrawMode.QUADS, UGraphics.CommonVertexFormats.POSITION_COLOR);
    worldRenderer.pos(matrixStack, (-width - 1.0) * scale, -1.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
    worldRenderer.pos(matrixStack, (-width - 1.0) * scale, 9.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
    worldRenderer.pos(matrixStack, (width + 1.0) * scale, 9.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
    worldRenderer.pos(matrixStack, (width + 1.0) * scale, -1.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
    worldRenderer.drawDirect();

    GlStateManager.func_179098_w();
    DefaultFonts.VANILLA_FONT_RENDERER.drawString(matrixStack, string, new Color(...color), -width * scale, ElementaFonts.MINECRAFT.getBelowLineHeight() * scale, width * 2, scale, true, null);
    UGraphics.depthMask(true);
    matrixStack.pop();

    GlStateManager.func_179126_j() //enableDepth()
}