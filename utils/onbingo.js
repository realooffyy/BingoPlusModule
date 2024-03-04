import settings from "../settings"

export function bingoCheck()
{
    if(!settings.only_on_bingo) return true
    let displayName = ''+Player.getDisplayName()
    if(displayName.includes("Ⓑ")) return true
    return false
}

export function onBingo()
{
    let displayName = ''+Player.getDisplayName()
    if(displayName.includes("Ⓑ")) return true
    return false
}