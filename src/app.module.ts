import { Module } from '@nestjs/common';
import { HealthController } from './controller/health.controller';
import { HealthService } from './service/health.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'assets', 'js'),
        serveRoot: '/scripts',
      },
      {
        rootPath: join(__dirname, '..', 'assets', 'html'),
        serveRoot: '/pages',
      },
    ),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
