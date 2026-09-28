import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../service/health.service';
import { HealthResponse } from '../types/health.types';

@Controller()
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    getHello(): HealthResponse {
        return this.healthService.getHealthCheck();
    }
}
