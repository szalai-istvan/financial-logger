export class DateUtil {
    getCurrentDateAndMonth(): DateAndMonth {
        const now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1
        };
    }
}