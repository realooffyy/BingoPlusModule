import settings from "../settings"

export function bingoFeaturesEnabled()
{
    if(!settings.only_on_bingo) return true
    return isOnBingo()
}

export function isOnBingo()
{
    let displayName = ''+Player.getDisplayName()
    if(displayName.includes("Ⓑ")) return true
    return false
}
