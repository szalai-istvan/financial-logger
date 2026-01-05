import { Db, MongoClient } from "mongodb";

let MONGO_CLIENT: MongoClient;
let DB: Db;

function connectToMongoDb() {
    MONGO_CLIENT = new MongoClient(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`);
    DB = MONGO_CLIENT.db(process.env.MONGO_DB);
}

function getDbConnection(): Db {
    return DB;
}

export const Mongo = {
    connectToMongoDb: connectToMongoDb,
    getDbConnection: getDbConnection
};