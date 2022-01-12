const Response = require("../helpers/response");
const mongoLogger = require("../helpers/mongoLogger");

module.exports = (error, req, res, next) => {

    error.route = req._parsedOriginalUrl.path;

    mongoLogger.storeError(error);

    res.status(error.status || 500).json(new Response(error.message, error.status || 500));

};
