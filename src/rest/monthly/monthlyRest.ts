import type { Request } from "express";
import type { MonthlyData } from "../../types/MonthlyData.js";
import type { ErrorMessage } from "../../types/Error.js";
import { ErrorCode } from "../../types/ErrorCode.js";
import { MONGO_COLLECTION_MONTHLY_DATA } from "../../mongo/connection.js";

export async function getMonthlyData(req: Request): Promise<MonthlyData> {
    const year = Number(req.params.year);
    const month = Number(req.params.month);

    if (!month || !year) {
        const error: ErrorMessage = {
            errorCode: ErrorCode.MISSING_PARAMETER,
            message: `Missing parameter: year=${year}, month=${month}`,
            status: 400
        };
        throw error;
    }

    const id = `${req.headers.userName}.${year}.${month}`;
    let monthlyData = await MONGO_COLLECTION_MONTHLY_DATA.findOne({_id: id});
    if (!monthlyData) {
        monthlyData = createBlankMonthlyData(id, year, month);
        await MONGO_COLLECTION_MONTHLY_DATA.insertOne(monthlyData);
    }

    return monthlyData;
}

function createBlankMonthlyData(id: string, year: number, month: number): MonthlyData {
    return {
        _id: id,
        year: year,
        month: month,
        costs: [],
        fixCosts: [],
        incomes: [],
        goal: {
            percentage: 0,
            amount: 0
        }
    };
}
