import { Injectable } from '@nestjs/common';
import { HealthResponse } from '../types/health.types';

const START_TIME = new Date().toLocaleString('hu-Hu', { timeZone: 'Europe/Budapest' });

@Injectable()
export class HealthService {
    getHealthCheck(): HealthResponse {
        return {
            status: 'ok',
            startTime: START_TIME
        }
    }
}
