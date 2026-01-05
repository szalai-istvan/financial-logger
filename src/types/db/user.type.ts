import type { SimpleDate } from "../date/datetime.type.js";
import type { AbstractDatabaseRecord } from "./AbstractDatabaseRecord.type.js";

export interface User extends AbstractDatabaseRecord {
    email: string,
    userName: string,
    password: string,
    lastLogin: SimpleDate | undefined
}