const logger = require("./logging/logger");
const express = require("express");

let expressApp;
const dbAccessor = require("./dbaccess/connector");

const startApplication = async () => {
    try {
        logger.info("initializing application");
        await dbAccessor.connect();
        logger.info("-------------Connected TO MongoDB-----------------");
        const app = express();
        app.use(require("./routes"))
        const port = Number(9000);
        app.listen(port);
        logger.info(`listening on port ${port}`);
    } catch (appError) {
        const { message: error, stack } = appError;
        const message = `unable to init application : ${error}\n${stack}`;
        console.error(message);
        logger.error(message);
        process.exit(2);
    }
};

startApplication().then(() =>
    logger.info("........Application Started Successfully......"),
);

module.exports = { startApplication, expressApp };
