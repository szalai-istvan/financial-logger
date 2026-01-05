import type { Collection } from "mongodb";
import { Constants } from "../constants/constants.js";
import { Mongo } from "../db/connection.js";
import type { User } from "../types/db/user.type.js";
import { CommonService } from "./common/common.service.js";

let MONGO_COLLECTION_USERS: Collection<User>;

function initCollection(): void {
    MONGO_COLLECTION_USERS = Mongo.getDbConnection().collection<User>(Constants.mongoDbCollections.user);
}

async function save(user: User): Promise<string> {
    const result = await MONGO_COLLECTION_USERS.insertOne(user);
    return result.insertedId;
}

async function findByUserName(userName: string): Promise<User | null> {
    return await MONGO_COLLECTION_USERS.findOne({userName});
}

export const UserService = {
    initCollection: initCollection,
    save: save,
    findByUserName: findByUserName
};