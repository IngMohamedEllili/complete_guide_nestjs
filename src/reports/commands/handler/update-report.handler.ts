import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { EventBusProvider, EventPublisher } from 'nestjs-eventstore';
import { Report } from 'src/reports/entities/report.entity';
import { ReportUpdatedEvent } from 'src/reports/events/impl/report-updated.event';
import { Repository } from 'typeorm';
import { UpdateReportCommand } from '../impl/update-report.command';

@CommandHandler(UpdateReportCommand)
export class UpdateReportHandler
  implements ICommandHandler<UpdateReportCommand>
{
  constructor(
    @InjectRepository(Report) private readonly _repository: Repository<Report>,
    private readonly _publisher: EventBusProvider,
  ) {}

  async execute(command: UpdateReportCommand) {
    const { updateReportDto, id } = command;
    const report = await this._repository.findOne(id);
    if (!report) {
      throw new NotFoundException(console.warn('not found'));
    }
    const reportAssign = Object.assign(report, updateReportDto);
    const reportUpdated = this._repository.save(reportAssign);
    this._publisher.publish(
      new ReportUpdatedEvent(updateReportDto),
      new ReportUpdatedEvent(updateReportDto).streamName,
    );
    return reportUpdated;
  }
}
