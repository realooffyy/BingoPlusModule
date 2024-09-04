// a lot of these are from bloom 🙏

// Removes all unicode characters from a string
export const removeUnicode = (string) => typeof(string) !== "string" ? "" : string.replace(/[^\u0000-\u007F]/g, "")

const checkingTriggers = [] // [[trigger, func]]
/**
 * Registers and unregisters the trigger depending on the result of the checkFunc. Use with render triggers to reduce lag when they are not being used.
 * @param {() => void} trigger 
 * @param {Function} checkFunc 
 * @returns 
 */
export const registerWhen = (trigger, checkFunc) => checkingTriggers.push([trigger.unregister(), checkFunc])

register("tick", () => {
    for (let i = 0; i < checkingTriggers.length; i++) {
        let [trigger, func] = checkingTriggers[i]
        if (func()) trigger.register()
        else trigger.unregister()
    }
})

/**
 * Checks a line of text to see if the regex matches. If it matches then return as the 'type', otherwise return as a string.
 * If no match is found, then return the default value.
 * @param {String} text - The string of text to be run against.
 * @param {RegExp} regex - The regex to be found (With a match value)
 * @param {any} defaultValue - The value to return if no match is found
 * @param {*} type - "float" or "int" to return the match parsed as float or int. Defaults to String.
 * @returns - If there is a match, return the match. Otherwise return default value.
 */
export const getValue = (text, regex, defaultValue, type) => {
    let match = text.match(regex)
    if (!match) return defaultValue
    if (type == "int") return parseInt(match[1].replace(/[^\d]/g, ""))
    if (type == "float") return parseFloat(match[1].replace(/[^\d]/g, ""))
    return match[1]
}
// Similar to the previous function, but runs a regexp over an entire array of strings.
// If any match, then return an array containing the matches
export const matchAllLines = (regex, list) => list.map(a => a.match(regex)).filter(a => !!a).map(a => a[1])
// Similar to previous one, but returns the value instead if there is a match.
export const getMatchFromLines = (regex, list, type) => {
    for (let i = 0; i < list.length; i++) {
        let match = list[i].match(regex)
        if (!match) continue
        return type == "int" ? parseInt(match[1]) : type == "float" ? parseFloat(match[1]) : match[1]
    }
    return null
}

// Get the scoreboard
export const getScoreboard = (formatted=false) => {
    if (!World.getWorld()) return null
    let sb = Scoreboard.getLines().map(a => a.getName())
    if (formatted) return Scoreboard.getLines()
    return sb.map(a => ChatLib.removeFormatting(a))
}
// Get the tab list
export const getTabList = (formatted=false) => {
    if (formatted) return TabList.getNames()
    return TabList.getNames().map(a => a.removeFormatting())
}


/**
 * 
 * @param {Number} slot slot number
 * @returns {Array} x and y coordinates of the top left
 */
export const getSlotLocation = (slot) => {
    let x = slot % 9
    let y = Math.floor(slot / 9)
    let renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18)
    let renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - Player.getContainer().getSize() / 18) * 18)
    return [renderX, renderY]   
}

// from AzuredClient
export function romanToInt(s) {
    let accumulator = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'I' && (s[i + 1] === 'V' || s[i + 1] === 'X')) {
            accumulator += romanHash[s[i + 1]] - romanHash[s[i]]
            i++
        } else {
            accumulator += romanHash[s[i]]
        }
    }
    return accumulator
}

// adapted from https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
export function msToTime(s) { 
    let ms = s % 1000
    s = (s - ms) / 1000
    let secs = s % 60
    s = (s - secs) / 60
    let mins = s % 60
    s = (s - mins) / 60
    let hrs = s % 24
    s = (s - hrs) / 24
    let days = s
  
    return [days, hrs, mins, secs]
}

// https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
export function convertDateObjectToString(date) { 
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

/**
 * Returns a random alphanumeric string
 * @param {Number} length
 * @returns the random string
 */
export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }
    
    return result
}

/**
 * Replaces spaces with underscores, or underscores with spaces
 * @param {String} string 
 * @returns the converted result
 */
export const spaceUndercoreConvert = (string) => {
    if (string.includes(' ')) return string.replaceAll(' ', '_')
    else if (string.includes('_')) return string.replaceAll('_', ' ')
    else return string
}

// from EmojiChatBar
export const addToChatBox = (text) => {
    const chatGui = Client.currentGui.get();
    if (chatGui) {
        const chatInputField = chatGui.field_146415_a;
        const currentText = chatInputField.func_146179_b();
        chatInputField.func_146180_a(currentText + text)
    }
}
