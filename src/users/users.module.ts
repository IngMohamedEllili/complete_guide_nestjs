import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CreateUserHandler } from './commands/handler/create-user.handler';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EventsHandler } from './events/handler';
import { UserNotificationHandler } from './commands/handler/notif-user.handler';
import { ReportSagas } from 'src/reports/sagas/report.saga';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    CreateUserHandler,
    UserNotificationHandler,
    ...EventsHandler,
    UsersService,
    AuthService,
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
