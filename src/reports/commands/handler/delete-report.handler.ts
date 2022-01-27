import { NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "src/reports/entities/report.entity";
import { Repository } from "typeorm";
import { DeleteReportCommand } from "../impl/delete-report.command";

@CommandHandler(DeleteReportCommand)
export class DeleteReportHandler implements ICommandHandler<DeleteReportCommand>{
   constructor( 
      @InjectRepository(Report) private readonly repo : Repository<Report>){}

  async execute(command: DeleteReportCommand): Promise<any> {
      const {id} = command
      const report = await this.repo.findOne(id)
      if(!report){
         throw new NotFoundException("report not found")
      }
      return this.repo.remove(report)
   }
}