import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotifiedUserEvent } from '../impl/user-notified.event';

@EventsHandler(NotifiedUserEvent)
export class NotifiedUserHandler implements IEventHandler<NotifiedUserEvent> {
  handle(event: NotifiedUserEvent) {
    Logger.log(event, 'new report added');
  }
}
