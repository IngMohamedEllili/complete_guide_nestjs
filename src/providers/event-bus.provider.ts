import {
    EventStoreBusConfig,
    EventStoreSubscriptionType,
} from 'nestjs-eventstore';
import { ReportCreatedEvent } from 'src/reports/events/impl/report-created.event';

const DeliveriesEventInstantiators = {
    RerportCreatedEvent: data => new ReportCreatedEvent(data),
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
        /* {
            type: EventStoreSubscriptionType.Persistent,
            stream: '$ce-orders',
            persistentSubscriptionName: 'g-delivery',
        }, */
        

    ],
    eventInstantiators: {
        ...DeliveriesEventInstantiators,
    },
};
