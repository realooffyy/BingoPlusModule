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
    'f': ['Common', 0],
    'a': ['Uncommon', 1],
    '9': ['Rare', 2],
    '5': ['Epic', 3],
    '6': ['Legendary', 4]
}

// abiphone call 
register("chat", (x) => {
    const pet = x.slice(2)
    const colour = x[1]
    const rarity = rarityList[colour]
    const price = pets[pet][rarity[1]]

    ChatLib.chat(`${PREFIX}&${colour}${rarity[0]} ${pet}&r needs &6${price[0]} coins&r and &a${price[1]}&r!`)
}).setCriteria("&e[NPC] &aOringo: &b✆ ${x} Pet").setContains()