import { CratedUserHandler } from './user-created.handler';
import { NotifiedUserHandler } from './user-notified.handler';

export const EventsHandler = [NotifiedUserHandler, CratedUserHandler];
