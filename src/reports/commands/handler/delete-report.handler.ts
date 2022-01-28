import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "src/reports/entities/report.entity";
import { Repository } from "typeorm";
import { EventPublisher } from 'nestjs-eventstore/dist/event-store/eventstore-cqrs/event-publisher'
import { DeleteReportCommand } from "../impl/delete-report.command";
import { DeletedReportEvent } from "src/reports/events/impl/report-deleted.event";
import { EventBusProvider } from "nestjs-eventstore";
import { eventStoreBusConfig } from "src/providers/event-bus.provider";

@CommandHandler(DeleteReportCommand)
export class DeleteReportHandler implements ICommandHandler<DeleteReportCommand>{
   constructor( 
      @InjectRepository(Report) private readonly repo : Repository<Report>,
      private readonly _publisher: EventBusProvider){}

  async execute(command: DeleteReportCommand) {
      const { id } = command
      const report = await this.repo.findOne(id)
      if(!report){
         throw new NotFoundException("report not found")
      }
      const event = new DeletedReportEvent()
      this._publisher.publish(event,event.streamName)
      this.repo.delete(report)
      
   }
}