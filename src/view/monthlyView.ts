import type { Request, Response } from "express";
import path from "path";

export function monthlyView(req: Request, res: Response) {
    const year = Number(req.params.year);
    const month = Number(req.params.month);

    if (!month || !year) {
        res
        .status(400)
        .json({error: `missing or invalid parameter, year=${year}, month=${month}`});
    }

    res.sendFile(path.resolve(process.cwd(), 'templates', 'monthly', 'monthly.html'));
}

export function currentMonthlyView(req: Request, res: Response) {
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();

    res.redirect(301, `/view/monthly/${year}/${month}`);
}