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