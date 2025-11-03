import { Collection, MongoClient } from "mongodb";
import type { MonthlyData } from "../types/MonthlyData.js";

const monthlyData = 'monthlyData';

let MONGO_CLIENT;
let DB;

export let MONGO_COLLECTION_MONTHLY_DATA: Collection<MonthlyData>;

export function connectToMongoDb() {
    MONGO_CLIENT = new MongoClient(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`);
    DB = MONGO_CLIENT.db(process.env.MONGO_DB);

    MONGO_COLLECTION_MONTHLY_DATA = DB.collection<MonthlyData>(monthlyData);
}