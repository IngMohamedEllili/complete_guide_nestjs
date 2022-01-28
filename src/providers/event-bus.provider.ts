import {
    EventStoreBusConfig,
    EventStoreSubscriptionType,
} from 'nestjs-eventstore';

export const eventStoreBusConfig: EventStoreBusConfig = {
    subscriptions: [
        // TODO: read about subs in eventStore, how can they help us.
        // TODO: dont forget to create a `Persistent Subscription`
        // TODO: and enable `resolveLinkTos` https://eventstore.org/docs/dotnet-api/reading-events/index.html
        

    ],
    eventInstantiators: {},
};
