import * as dotenv from 'dotenv'

export class ConfigServices {
  constructor() {
      dotenv.config({
          path: `.env.development`,
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
        protocol:'http',
        connectionSettings: {
            defaultUserCredentials: {
                username:'admin',
                password:'changeit',
            },
            verboseLogging: true,
            failOnNoServerResponse: true,
            // log: console, // TODO: improve Eventstore logger (separate chanel)
        },
        tcpEndpoint: {
            host: 'localhost',
            port: 1113,
        },
        httpEndpoint: {
            host: 'localhost',
            port: 2113,
        },
        poolOptions: {
            min: 1,
            max: 10,
        },
    };
}

}
