import { data } from "../utils/constants"

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

export const getStringHeight = text => text.split('\n').length * 9


/**
 * Draws a text box
 * @param {String} - the string to render
 * @param {String} - the Pogdata property name to get coordinates and scale from
 * @param {Number} - height of text
 * @param {Number} - width of text
 * @param {Number} - border size
 */
export function rendering(text, dataName, height = 100, width = 100, border = 5) {
    const guiX = data[dataName].x
    const guiY = data[dataName].y
    const scale = data[dataName].scale
    const guiHeight = height * scale
    const guiWidth = width * scale
    const guiBorder = border * scale

    const rectangle = new Rectangle(Renderer.color(0, 0, 0, 80), guiX, guiY, guiWidth+guiBorder, guiHeight)
    rectangle.draw()

    Renderer.translate(guiX+(border*scale), guiY+(border*scale))
    Renderer.scale(scale)
    Renderer.drawStringWithShadow(text, 0, 0)
}