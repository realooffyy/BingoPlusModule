export default new class Window {
    getTitle() {
        return Player?.getContainer()?.getName()?.removeFormatting()
    }
}