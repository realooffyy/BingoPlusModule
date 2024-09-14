export default new class Window {
    constructor() {
        this.title = null

    }

    getTitle() {
        return Player?.getContainer()?.getName()?.removeFormatting()
    }
}