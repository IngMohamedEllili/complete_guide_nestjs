import { Injectable, Logger } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';
import { EventObservable } from '@nestjs/cqrs/dist/interfaces/event-observable.interface';
import { delay, map, Observable } from 'rxjs';
import { CreateUserCommand } from 'src/users/commands/impl/create-user.command';
import { UserNotificationCommand } from 'src/users/commands/impl/notif-user.command';
import { NotifiedUserEvent } from 'src/users/events/impl/user-notified.event';
import { ReportCreatedEvent } from '../events/impl/report-created.event';
@Injectable()
export class ReportSagas {
  reportCreated = (events$: EventObservable<any>): Observable<ICommand> => {
    return events$.ofType(ReportCreatedEvent).pipe(
      delay(1000),
      map((event) => {
        Logger.log('inside [reportSaga] saga', 'ReportSaga');
        const reportId = event.reportDto;
        console.log(reportId);
        return new UserNotificationCommand(reportId);
      }),
    );
  };
}
