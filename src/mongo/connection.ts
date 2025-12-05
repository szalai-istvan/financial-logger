import { Collection, MongoClient } from "mongodb";
import type { MonthlyData } from "../types/monthlyData.type.js";
import type { User } from "../types/user.type.js";

const monthlyData = 'monthlyData';
const user = 'user';

let MONGO_CLIENT;
let DB;

export let MONGO_COLLECTION_MONTHLY_DATA: Collection<MonthlyData>;
export let MONGO_COLLECTION_USERS: Collection<User>;

export function connectToMongoDb() {
    MONGO_CLIENT = new MongoClient(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`);
    DB = MONGO_CLIENT.db(process.env.MONGO_DB);

    MONGO_COLLECTION_MONTHLY_DATA = DB.collection<MonthlyData>(monthlyData);
    MONGO_COLLECTION_USERS = DB.collection<User>(user);
}