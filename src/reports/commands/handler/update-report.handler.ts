import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "src/reports/entities/report.entity";
import { Repository } from "typeorm";
import { UpdateReportCommand } from "../impl/update-report.command";

@CommandHandler(UpdateReportCommand)
export class UpdateReportHandler implements ICommandHandler<UpdateReportCommand>{
constructor(@InjectRepository(Report) private readonly _repository : Repository<Report>){}

  async execute(command: UpdateReportCommand): Promise<any> {
      const { updateReportDto, id, user } = command
      const report = await this._repository.findOne(id)
      if(!report){
        throw new NotFoundException(console.warn('not found'))
      }
      Object.assign(report, updateReportDto)
      return this._repository.save(report)
      
  }
}