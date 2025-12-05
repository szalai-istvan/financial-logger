import type { SimpleDate } from "./misc.type.js";

export interface User {
    username: string,
    password: string,
    lastLogin: SimpleDate | undefined
}