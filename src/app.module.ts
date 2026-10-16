import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthController } from './controller/auth.controller';
import { HealthController } from './controller/health.controller';
import { HtmlRedirectController } from './controller/htmlRedirect.controller';
import { MonthlyDataController } from './controller/monthlyData.controller';
import { AuthService } from './service/auth.service';
import { HealthService } from './service/health.service';
import { HtmlRedirectService } from './service/htmlRedirect.service';
import { MonthlyDataService } from './service/monthlyData.service';
import { DateUtil } from './utilities/date.util';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
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
  controllers: [
    AuthController,
    HealthController,
    HtmlRedirectController,
    MonthlyDataController,
  ],
  providers: [
    AuthService,
    HealthService,
    HtmlRedirectService,
    MonthlyDataService,
    DateUtil,
  ],
})
export class AppModule { }
