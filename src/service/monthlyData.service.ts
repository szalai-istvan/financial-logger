import { Injectable } from '@nestjs/common';
import { MonthlyData } from '../types/monthlyData.types';


@Injectable()
export class MonthlyDataService {

    async getMonthlyData(year: number, month: number): Promise<MonthlyData | undefined> {
        return undefined;
    }
}
