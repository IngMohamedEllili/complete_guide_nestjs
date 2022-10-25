import { Logger } from '@nestjs/common';
import { IAggregateEvent } from 'nestjs-eventstore';
import { ReportDto } from 'src/reports/dtos/report.dto';

export class DeletedReportEvent implements IAggregateEvent {
  constructor(public readonly id: number) {}
  get streamName() {
    return `report - ${this.id}`;
  }
}
