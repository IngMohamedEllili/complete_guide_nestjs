import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DeletedReportEvent } from "../impl/report-deleted.event";

@EventsHandler(DeletedReportEvent)
export class DeletedReportHandler implements IEventHandler<DeletedReportEvent>{
  handle(event: DeletedReportEvent) {
      Logger.log(event, 'report Deleted') 
  }
}