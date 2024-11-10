import { registerWhen } from "../../utils/utils"
import settings from "../../settings"
import Skyblock from "../../utils/Skyblock"

const nameRegex = /^§\w(.*?) (Splash )?Potion$/ // https://regex101.com/r/aWdGG4/1
const loreRegex = /§(\w).*/ // https://regex101.com/r/kht3Li/2

// Show potion abbreviation
// thanks chick man
const items = new (Java.type('java.util.WeakHashMap'))();
registerWhen(register("renderItemIntoGui", (item, x, y) => {
    const stack = item.itemStack
    let str = items.get(stack)
    if (str === '') return
    if (!str) {
        const n = item.getName()
        str = n.includes('Splash Potion') ? item.getLore()[2].match(/^([§\w]*§\w\w{1,3})/)[1] + '.' : ''
        items.put(stack, str)
        if (!str) return
    }
    Renderer.translate(x, y, 251)
    Renderer.scale(0.6)
    Renderer.drawString(str, 0, 0)
}), () => settings().potionAbbreviation && Skyblock.inSkyblock)

// these functions will have a use eventually trust

/**
 * Gets all potions from the current inventory
 * @returns array with any potions found
 */
const getPotions = () => {
    let potions = []
    const items = Player.getContainer().getItems()
    let counter = 0
    items.forEach(item => {
        const potion = getPotion(item)
        if (potion) {
            potion.slotNumber = counter
            potions.push(potion)
        }
        counter++
    })
    return potions
}

/**
 * Attempts to get potion from an item
 * @param {*} item 
 * @returns potion object if successful, undefined if not
 */
const getPotion = (item) => {
    if (!item) return

    const potion = {
        isSplash: null,
        name: null,
        colour: null,
    }

    const name = item.getName()
    let match = name.match(nameRegex)
    if (match) {
        potion.name = match[1]
        potion.isSplash = match[2].includes("Splash")
    } else return

    [ _, potion.colour] = item.getLore()[1].match(loreRegex)
    
    // if any values are still null, cancel
    if (Object.values(potion).some(value => value === null)) return
    return potion
}