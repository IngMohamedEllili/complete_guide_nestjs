import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "src/reports/entities/report.entity";
import { Repository } from "typeorm";
import { CreateReportCommand } from "../impl/create-report.command";
import { EventPublisher } from 'nestjs-eventstore/dist/event-store/eventstore-cqrs/event-publisher'

@CommandHandler(CreateReportCommand)
export class CreateReportHandler implements ICommandHandler<CreateReportCommand>{

  constructor( 
    @InjectRepository(Report) private readonly _repository: Repository<Report>,
    private readonly _publisher: EventPublisher
    ){}

  async execute(command: CreateReportCommand) {
    Logger.log('Async CreateDeliveryHandler...', 'CreateDeliveryCommand');
    const {createReportDto} = command
    const report = await this._repository.create(createReportDto)
    const reportSaved = await this._repository.save(report)
    const reportMeged = this._publisher.mergeObjectContext(reportSaved)
      return reportSaved
}
}