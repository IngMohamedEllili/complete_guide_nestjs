import { Logger } from "@nestjs/common";
import { EventsHandler, IEvent, IEventHandler } from "@nestjs/cqrs";
import { ReportUpdatedEvent } from "../impl/report-updated.event";

@EventsHandler(ReportUpdatedEvent)
export class ReportUpdatedHandler implements IEventHandler<ReportUpdatedEvent>{
  async handle(event: ReportUpdatedEvent) {
      Logger.log(event, 'report updated')
  }
}