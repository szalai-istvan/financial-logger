import type { Collection } from "mongodb";
import type { User } from "../types/db/user.type.js";
import { Constants } from "../constants/constants.js";
import { Mongo } from "../db/connection.js";

const MONGO_COLLECTION_USERS: Collection<User> = Mongo.getDbConnection().collection<User>(Constants.mongoDbCollections.user);

