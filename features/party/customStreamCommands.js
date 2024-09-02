import settings from "../../settings"

export const streamCommands = [
    [
        "/stream", "Opens Hypixel's new stream ui (unchanged)"
    ], [
        "/stream [number] | /stream open [number]", "Starts a public party. Default is 100 players",
        /\/stream (\d+)/, "/streamgui players {0}"
    ], [
        "/stream drain | /stream empty", "Empties the party",
        /^\/stream (?:drain|empty).*$/
    ]
]