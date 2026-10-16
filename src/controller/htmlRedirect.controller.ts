import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { HtmlRedirectService } from '../service/htmlRedirect.service';

@Controller('/')
export class HtmlRedirectController {
    constructor(private readonly htmlRedirectService: HtmlRedirectService) { }

    @Get()
    redirectToMonthlyData(@Res() res: Response) {
        return this.htmlRedirectService.redirectToMonthlyData(res);
    }
}
