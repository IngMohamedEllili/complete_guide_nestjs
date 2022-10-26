import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusProvider } from 'nestjs-eventstore';
import { NotifiedUserEvent } from 'src/users/events/impl/user-notified.event';
import { UserNotificationCommand } from '../impl/notif-user.command';

@CommandHandler(UserNotificationCommand)
export class UserNotificationHandler
  implements ICommandHandler<UserNotificationCommand>
{
  constructor(private readonly _publisher: EventBusProvider) {}

  async execute(command: UserNotificationCommand) {
    Logger.log('async NotifiedUser', 'NotifiedUser');
    const { user } = command;
    console.log(user);
    this._publisher.publish(
      new NotifiedUserEvent(user),
      new NotifiedUserEvent(user).streamName,
    );
    return user;
  }
}
