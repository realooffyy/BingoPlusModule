import constants from "../utils/constants"

PREFIX = constants.PREFIX

const pets = {
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
        ['10k', '64x Jungle Wood'],
        ['25k', '1x Enchanted Jungle Wood'],
        ['100k', '16x Enchanted Jungle Wood'],
        ['1M', '128x Enchanted Jungle Wood'],
        ['18M', '512x Enchanted Jungle Wood']
    ],

    'Elephant': [
        ['10k', '64x Dark Oak Wood'],
        ['25k', '1x Enchanted Dark Oak Wood'],
        ['100k', '16x Enchanted Dark Oak Wood'],
        ['1M', '128x Enchanted Dark Oak Wood'],
        ['15M', '512x Enchanted Dark Oak Wood']
    ]
} // i probably got at least something wrong

const rarityList = {
    'f': ['COMMON', 0],
    'a': ['UNCOMMON', 1],
    '9': ['RARE', 2],
    '5': ['EPIC', 3],
    '6': ['LEGENDARY', 4]
}

// abiphone call 
register("chat", (x, e) => {
    const pet = x.slice(2)
    const colour = x[1]
    if (!rarityList[colour] || !pets[pet]) { ChatLib.chat(`${PREFIX}&cPet not read correctly!`); return }

    cancel(e)

    const rarity = rarityList[colour]
    const price = pets[pet][rarity[1]]

    ChatLib.chat(
    `&e[NPC] &aOringo: &b✆
 &7• &${colour}&l${rarity[0]} &${colour}${pet}&r
  &7⟹ &6${price[0]} coins&r
  &7⟹ &a${price[1]}&r`
    )

}).setCriteria("&e[NPC] &aOringo: &b✆ &8• ${x} Pet").setContains()