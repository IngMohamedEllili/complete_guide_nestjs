import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ReportCreatedEvent } from "../impl/report-created.event";

@EventsHandler(ReportCreatedEvent)
export class ReportCreatedHandler implements IEventHandler<ReportCreatedEvent>{
  handle(event: ReportCreatedEvent) {
      Logger.log(event, 'ReportCreatedEventxxx')
  }
}