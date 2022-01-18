import { Module } from '@nestjs/common';
import { EventStoreModule } from '@juicycleff/nestjs-event-store';

@Module({
  imports: [
    EventStoreModule.register({
      type: 'event-store',
      tcpEndpoint: {
        host: 'localhost',
        port: 1113,
      },
      options: {
        maxRetries: 1000, // Optional
        maxReconnections: 1000,  // Optional
        reconnectionDelay: 1000,  // Optional
        heartbeatInterval: 1000,  // Optional
        heartbeatTimeout: 1000,  // Optional
        defaultUserCredentials: {
          password: 'admin',
          username: 'chnageit',
        },
      },
    }),
  ]
})
export class AppModule {}