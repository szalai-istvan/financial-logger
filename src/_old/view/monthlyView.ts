import type { Request, Response } from "express";
import path from "path";
import { TemplateProcessor } from "./templates/templateProcessor.js";
import { Constants } from "../constants/constants.js";
import { DateHelper } from "../helpers/date.helper.js";

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
            monthName: Constants.monthNames[month] || ''
        },
        templateConstants: {
            year: year,
            month: month
        }
    };
    const template = TemplateProcessor.processTemplate(templatePath, params);
    res.send(template);
}

export function currentMonthlyView(req: Request, res: Response) {
    const currentDate = DateHelper.getCurrentDate();
    const year = currentDate.year;
    const month = currentDate.month;

    res.redirect(301, `/view/monthly/${year}/${month}`);
}