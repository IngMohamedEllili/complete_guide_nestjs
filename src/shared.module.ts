import { Global, Module } from "@nestjs/common";
import { ConfigServices } from "./config.service";

const providers = [
  ConfigServices]

  @Global()
  @Module({
    providers,
    exports: [...providers]
  })

  export class SharedModule{}