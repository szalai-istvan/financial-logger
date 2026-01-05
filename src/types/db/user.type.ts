import type { SimpleDate } from "../datetime.type.js";

export interface User {
    username: string,
    password: string,
    lastLogin: SimpleDate | undefined
}