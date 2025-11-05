import type { SimpleDate } from "../types/misc.type.js";

export function getCurrentDate(): SimpleDate {
    const date = new Date();
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getDate()
    };
}