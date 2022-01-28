import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "src/reports/entities/report.entity";
import { Repository } from "typeorm";
import { EventPublisher } from 'nestjs-eventstore/dist/event-store/eventstore-cqrs/event-publisher'
import { DeleteReportCommand } from "../impl/delete-report.command";

@CommandHandler(DeleteReportCommand)
export class DeleteReportHandler implements ICommandHandler<DeleteReportCommand>{
   constructor( 
      @InjectRepository(Report) private readonly repo : Repository<Report>,
      private readonly _publisher: EventPublisher){}

  async execute(command: DeleteReportCommand): Promise<any> {
      const { id } = command
      const report = await this.repo.findOne(id)
      if(!report){
         throw new NotFoundException("report not found")
      }
      const reportRemoved= this.repo.remove(report)
      //const reportMerged = this._publisher.mergeObjectContext(reportRemoved)
   }
}