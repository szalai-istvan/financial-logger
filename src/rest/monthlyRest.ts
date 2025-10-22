import type { Request, Response } from "express";

export function getMonthlyData(req: Request, res: Response) {
    const year = Number(req.params.year);
    const month = Number(req.params.month);

    if (!month || !year) {
        res
        .status(400)
        .json({error: `missing or invalid parameter, year=${year}, month=${month}`});
    }

    res.status(200).json({
        year: year,
        month: month,
        expenses: [{
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
    });
}