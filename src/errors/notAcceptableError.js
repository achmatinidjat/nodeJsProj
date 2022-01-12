class NotAcceptableError extends Error {
    constructor(message) {
        super(message);
        this.name = "Not acceptable";
        this.status = 406;
    }
}

module.exports = NotAcceptableError;