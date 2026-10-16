import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthController } from './controller/health.controller';
import { HtmlRedirectController } from './controller/htmlRedirect.controller';
import { MonthlyDataController } from './controller/monthlyData.controller';
import { HealthService } from './service/health.service';
import { HtmlRedirectService } from './service/htmlRedirect.service';
import { MonthlyDataService } from './service/monthlyData.service';
import { DateUtil } from './utilities/date.util';

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
  controllers: [HealthController, HtmlRedirectController, MonthlyDataController],
  providers: [HealthService, HtmlRedirectService, MonthlyDataService, DateUtil],
})
export class AppModule { }
