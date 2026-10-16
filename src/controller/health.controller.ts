import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../service/health.service';
import { HealthResponse } from '../types/health.types';

@Controller('/health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    getHealthCheck(): HealthResponse {
        return this.healthService.getHealthCheck();
    }
}
