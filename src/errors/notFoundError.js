class NotFOundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Not found";
        this.status = 404;
    }
}

module.exports = NotFOundError;