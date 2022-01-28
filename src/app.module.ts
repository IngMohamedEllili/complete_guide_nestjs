import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
const  cookieSession = require('cookie-session');
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared.module';
import { EventStoreCqrsModule } from 'nestjs-eventstore';
import { ConfigServices } from './config.service';
import { eventStoreBusConfig } from './providers/event-bus.provider';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    CqrsModule,
    ReportsModule, 
    UsersModule,
    TypeOrmModule.forRoot(), 
    EventStoreCqrsModule.forRootAsync(
      {
          useFactory: async (config: ConfigServices) => {
              return {
                  connectionSettings:
                      config.eventStoreConfig.connectionSettings,
                  endpoint: config.eventStoreConfig.tcpEndpoint,
              };
          },
          inject: [ConfigServices],
      },
      eventStoreBusConfig,
  ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }]
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
