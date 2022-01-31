import { IAggregateEvent } from "nestjs-eventstore";
import { UpdateReportDto } from "src/reports/dtos/update-report.dto";

export class ReportUpdatedEvent implements IAggregateEvent{
  constructor(public readonly reportDto : UpdateReportDto){}
  get streamName(){
    return `report - ${this.reportDto}`
  }
}