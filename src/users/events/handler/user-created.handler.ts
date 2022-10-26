import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedUserEvent } from '../impl/user-created.event';

@EventsHandler(CreatedUserEvent)
export class CratedUserHandler implements IEventHandler<CreatedUserEvent> {
  handle(event: CreatedUserEvent) {
    Logger.log('new user created', event);
  }
}
