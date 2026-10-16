import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { DateUtil } from '../utilities/date.util';

@Injectable()
export class HtmlRedirectService {

    constructor(private readonly dateUtil: DateUtil) {}

    redirectToMonthlyData(@Res() res: Response) {
        const date = this.dateUtil.getCurrentDateAndMonth();
        return res.redirect(302, `/pages/monthly.html?year=${date.year}&month=${date.month}`);
    }
}
