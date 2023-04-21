const router = require("express").Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const constants = require("../../utils/constants");
const logger = require("../../logging/logger");
const libraryController = require("../../controller/libraryController");

const libraryRequestHandler = async (requestFunction, request, response) => {
    try {
        const requestData =
            request.method === "GET" ? request.query : request.body;
        logger.info(`Requested data: ${JSON.stringify(requestData)}`);
        const apiResponse = await libraryController[requestFunction](
            requestData,
            response
        );
        response.status(constants.OK).json(apiResponse);
    } catch (error) {
        logger.error(
            `unable to process fetch request for ${requestFunction}  data - ${error.message} ${error.stack}`
        );
        response.status(constants.INTERNAL_SERVER_ERROR_CODE).json({
            CODE: constants.INTERNAL_SERVER_ERROR_CODE,
            ERROR: constants.INTERNAL_SERVER_ERROR,
            DESCRIPTION: error.message,
        });
    }
};

router.get(
    "/getIssuedBook",
    libraryRequestHandler.bind(this, "fetchIssuedBooks")
);

router.get(
    "/getAllAvailbleBook",
    libraryRequestHandler.bind(this, "fetchAllAvailbleBookData")
);

router.post(
    "/issueBook",
    jsonParser,
    libraryRequestHandler.bind(this, "postIssueBook")
);

module.exports = router;
