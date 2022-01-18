import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
const  cookieSession = require('cookie-session');
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    ReportsModule, 
    UsersModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }],
})
export class AppModule {
  constructor(private configService: ConfigService){}
  configure(consumer: MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })
    )
    .forRoutes('*')
  }
} 
