import settings from "../../settings"
import constants from "../../utils/constants"
import { toDiscordAnsi } from "../../utils/utils"

PREFIX = constants.PREFIX

const oringoPets = {
    'Blue Whale': [
        ['10k', '64x Raw Fish'],
        ['25k', '1x Enchanted Raw Fish'],
        ['100k', '16x Enchanted Raw Fish'],
        ['1M', '1x Enchanted Cooked Fish'],
        ['10M', '8x Enchanted Cooked Fish']
    ],

    'Lion': [
        ['10k', '64x Raw Beef'],
        ['25k', '2x Enchanted Raw Beef'],
        ['100k', '32x Enchanted Raw Beef'],
        ['1M', '256x Enchanted Raw Beef'],
        ['15M', '1024x Enchanted Raw Beef']
    ],

    'Tiger': [
        ['10k', '128x Raw Chicken'],
        ['25k', '2x Enchanted Raw Chicken'],
        ['100k', '32x Enchanted Raw Chicken'],
        ['1M', '256x Enchanted Raw Chicken'],
        ['15M', '1024x Enchanted Raw Chicken']
    ],

    'Giraffe': [
        ['10k', '64x Acacia Wood'],
        ['25k', '1x Enchanted Acacia Wood'],
        ['100k', '16x Enchanted Acacia Wood'],
        ['1M', '128x Enchanted Acacia Wood'],
        ['10M', '512x Enchanted Acacia Wood']
    ],

    'Monkey': [
        ['10k', '64x Acacia Wood'],
        ['25k', '1x Enchanted Jungle Wood'],
        ['100k', '16x Enchanted Jungle Wood'],
        ['1M', '128x Enchanted Jungle Wood'],
        ['18M', '512x Enchanted Jungle Wood']
    ],

    'Elephant': [
        ['10k', '64x Acacia Wood'],
        ['25k', '1x Enchanted Dark Oak Wood'],
        ['100k', '16x Enchanted Dark Oak Wood'],
        ['1M', '128x Enchanted Dark Oak Wood'],
        ['15M', '512x Enchanted Dark Oak Wood']
    ]
} // i probably got at least something wrong

const rarityList = {
    'f': ['&f&lCOMMON', 0],
    'a': ['&a&lUNCOMMON', 1],
    '9': ['&9&lRARE', 2],
    '5': ['&5&lEPIC', 3],
    '6': ['&6&lLEGENDARY', 4]
}

let pets = []

// TODO: fix this attrocity
// abiphone call 
register("chat", (x, e) => {
    if (!settings().oringoAbiphoneCost) return
    const pet = x.slice(2)
    const colour = x[1]
    if (!rarityList[colour] || !oringoPets[pet]) { ChatLib.chat(`${PREFIX}&cPet not read correctly!`); return }

    cancel(e)

    const rarity = rarityList[colour]
    const price = oringoPets[pet][rarity[1]]

    ChatLib.chat(
`&e[NPC] Oringo&f: &b✆
 &7• &${colour}&l${rarity[0]} &${colour}${pet}&r
  &7⟹ &6${price[0]} coins&r
  &7⟹ &a${price[1]}&r`
    )

    pets.push([rarity[0], pet, price])

    if (rarity[1] == 4 && settings().oringoDiscordCopy) {
        let lines = ['&lTravelling Zoo', '']
    
        // order pets by rarity
        Object.entries(rarityList)
            .sort(([, a], [, b]) => a[1] - b[1])
            .forEach(([_, value]) => {
            const rarity = value[0]
                pets.forEach(pet => {
                    if (pet[0] === rarity) lines.push(`${pet[0]} ${pet[1]}&r: &6${pet[2][0]} coins &rand &2${pet[2][1]}&r`)
                })
        })

        pets = []

        const discordAnsi = toDiscordAnsi(lines.join('\n'))
        ChatLib.command(`ct copy ${discordAnsi}`, true)
        ChatLib.chat(`${PREFIX}&aCopied all pets to clipboard. You can send this in Discord.`)
    }

}).setCriteria("&e[NPC] Oringo&f: &b✆ &f&r&8• ${x} Pet&r")

register("worldLoad", () => {
    pets = []
})