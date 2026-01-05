import type { SimpleDate } from "../types/datetime.type.js";

function getCurrentDate(): SimpleDate {
    const date = new Date();
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getDate()
    };
}

export const DateHelper = {
    getCurrentDate: getCurrentDate
};