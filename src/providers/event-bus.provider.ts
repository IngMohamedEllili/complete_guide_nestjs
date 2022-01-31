import {
    EventStoreBusConfig,
    EventStoreSubscriptionType,
} from 'nestjs-eventstore';
import { ReportCreatedEvent } from 'src/reports/events/impl/report-created.event';
import { DeletedReportEvent } from 'src/reports/events/impl/report-deleted.event';
import { NotifiedUserEvent } from 'src/users/events/impl/user-notified.event';

const ReportEventInstantiators = {
    ReportCreatedEvent: data => new ReportCreatedEvent(data),
    DeletedReportEvent: id => new DeletedReportEvent(id),
    NotifiedUserEvent : data => new NotifiedUserEvent(data)
};

export const eventStoreBusConfig: EventStoreBusConfig = {
    subscriptions: [
        // TODO: read about subs in eventStore, how can they help us.
        // TODO: dont forget to create a `Persistent Subscription`
        // TODO: and enable `resolveLinkTos` https://eventstore.org/docs/dotnet-api/reading-events/index.html
        {
            // persistent subscription
            type: EventStoreSubscriptionType.Persistent,
            stream: '$ce-report',
            persistentSubscriptionName: 'g-report',
        },

    ],
    eventInstantiators: {
        ...ReportEventInstantiators
    },
};
