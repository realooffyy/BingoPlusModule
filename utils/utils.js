// thanks bloom

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