import type { Request, Response } from "express";
import path from "path";
import { processTemplate } from "./templates/templateProcessor.js";
import { MONTH_NAMES } from "../constants/constants.js";

export function monthlyView(req: Request, res: Response) {
    const year = Number(req.params.year);
    const month = Number(req.params.month);

    if ((month !== 0 && !month) || !year) {
        res
        .status(400)
        .json({error: `missing or invalid parameter, year=${year}, month=${month}`});
    }

    const templatePath: string = path.resolve(process.cwd(), 'templates', 'monthly', 'monthly.html');
    const params = {
        parameters: {
            year: year,
            month: month,
            monthName: MONTH_NAMES[month] || ''
        },
        templateConstants: {
            year: year,
            month: month
        }
    };
    const template = processTemplate(templatePath, params);
    res.send(template);
}

export function currentMonthlyView(req: Request, res: Response) {
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();

    res.redirect(301, `/view/monthly/${year}/${month}`);
}