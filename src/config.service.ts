import * as dotenv from 'dotenv'

export class ConfigService {
  constructor() {
      dotenv.config({
          path: `.env`,
      });
  }

  public get(key: string): string {
      return process.env[key];
  }

  public getNumber(key: string): number {
      return Number(this.get(key));
  }

  get nodeEnv(): string {
      return this.get('NODE_ENV') || 'development';
  }

  get eventStoreConfig() {
    return {
        protocol: this.get('EVENT_STORE_PROTOCOL') || 'http',
        connectionSettings: {
            defaultUserCredentials: {
                username:
                    this.get('EVENT_STORE_CREDENTIALS_USERNAME') || 'admin',
                password:
                    this.get('EVENT_STORE_CREDENTIALS_PASSWORD') ||
                    'changeit',
            },
            verboseLogging: true,
            failOnNoServerResponse: true,
            // log: console, // TODO: improve Eventstore logger (separate chanel)
        },
        tcpEndpoint: {
            host: this.get('EVENT_STORE_HOSTNAME') || 'localhost',
            port: this.getNumber('EVENT_STORE_TCP_PORT') || 1113,
        },
        httpEndpoint: {
            host: this.get('EVENT_STORE_HOSTNAME') || 'localhost',
            port: this.getNumber('EVENT_STORE_HTTP_PORT') || 2113,
        },
        poolOptions: {
            min: this.getNumber('EVENT_STORE_POOLOPTIONS_MIN') || 1,
            max: this.getNumber('EVENT_STORE_POOLOPTIONS_MAX') || 10,
        },
    };
}
}
