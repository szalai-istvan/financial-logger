import { Controller, Get, Param } from '@nestjs/common';
import { MonthlyData } from '../types/monthlyData.types';
import { MonthlyDataService } from '../service/monthlyData.service';

@Controller('/monthlyData')
export class MonthlyDataController {
    constructor(private readonly monthlyDataService: MonthlyDataService) { }

    @Get(':year/:month')
    async getMonthlyData(@Param('year') year: number, @Param('month') month: number): MonthlyData {
        return this.monthlyDataService.getMonthlyData(year, month);
    }
}
