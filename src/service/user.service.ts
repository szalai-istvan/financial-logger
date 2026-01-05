import type { Collection } from "mongodb";
import { Constants } from "../constants/constants.js";
import { Mongo } from "../db/connection.js";
import type { User } from "../types/db/user.type.js";
import { CommonService } from "./common/common.service.js";

const MONGO_COLLECTION_USERS: Collection<User> = Mongo.getDbConnection().collection<User>(Constants.mongoDbCollections.user);

async function save(user: User): Promise<string> {
    const result = await MONGO_COLLECTION_USERS.insertOne(user);
    return result.insertedId;
}

export const UserService = {
    save: save
};