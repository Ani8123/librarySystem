const mongoose = require("mongoose");
const logger = require("../logging/logger");
const bookModelData = require("./bookModel")();

class DbConnetor {
    constructor(){
        this.client = null;
        this.schemaRefs = {};
    }

    async connect(){
        try{
            const mongoConnectionURI = "mongodb+srv://vanirudh50:jus5v1A2A911Qw6G@cluster0.qlio6np.mongodb.net/?retryWrites=true&w=majority";
            logger.debug("Connecting to Mongo URI: ");

            const dbClient = await mongoose.connect(mongoConnectionURI);
            logger.info("Connection to Mongo Established");
            this.client = dbClient;
            mongoose.set("debug", (collectionName, method, query, doc) => {
                console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
            });
        }
        catch (dbError) {
            const errorMessage = `unable to connect with mongo client - ${dbError.message} : ${dbError.stack}`;
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    async createCollection(collectionName, modelSchema)
    {
        let model = this.schemaRefs[collectionName];
        let mongoClient = await this.getClient();

        if (!model) {

            const schema = new mongoose.Schema(modelSchema);
            
            schema.set("toJSON", { getters: true, virtuals: false });

            model = mongoClient.model(collectionName, schema);

            this.schemaRefs[collectionName] = model;
        }

        return model;
    }

    getClient() {
        return this.client;
    }

    async libraryModel(){
        const {collectionName, bookSchema} = bookModelData;
        return this.createCollection(collectionName, bookSchema);
    }
}


module.exports = new DbConnetor();