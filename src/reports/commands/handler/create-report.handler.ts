import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { EventBusProvider } from "nestjs-eventstore";
import { Report } from "src/reports/entities/report.entity";
import { ReportCreatedEvent } from "src/reports/events/impl/report-created.event";
import { Repository } from "typeorm";
import { CreateReportCommand } from "../impl/create-report.command";

@CommandHandler(CreateReportCommand)
export class CreateReportHandler implements ICommandHandler<CreateReportCommand>{

  constructor( 
    @InjectRepository(Report) private readonly _repository: Repository<Report>,
    private readonly _publisher: EventBusProvider
    ){}
  async execute(command: CreateReportCommand) {
    Logger.log('Async CreateReportHandler...');
    
    const {createReportDto, user} = command
    const report = this._repository.create(createReportDto)
    report.user= user
    const reportSaved = await this._repository.save(report)  
    const reportToDto= reportSaved.toDto() 
    const event = new ReportCreatedEvent(reportToDto)
    this._publisher.publish(event,event.streamName)
    return reportSaved
}
}