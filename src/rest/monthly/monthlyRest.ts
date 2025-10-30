import type { Request } from "express";
import type { MonthlyData } from "../../types/MonthlyData.js";
import type { ErrorMessage } from "../../types/Error.js";
import { ErrorCode } from "../../types/ErrorCode.js";

export function getMonthlyData(req: Request): MonthlyData {
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

    return {
        year: year,
        month: month,
        costs: [{
            day: 1,
            amount: 1500,
            category: 'other',
            comment: 'megjegyzés'
        },
        {
            day: 2,
            amount: 3000,
            category: 'other',
            comment: 'megjegyzés 2'
        }],
        goal: {
            percentage: 100,
            amount: 120000
        },
        incomes: [
            {
                name: 'munkabér',
                amount: 500000
            },
            {
                name: 'befektetések hozama',
                amount: 20000
            }
        ],
        fixCosts: [
            {
                name: 'bérlet',
                amount: 9500
            },
            {
                name: 'törlesztő',
                amount: 250000
            }
        ]
    };
}