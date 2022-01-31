
import { IAggregateEvent } from "nestjs-eventstore";
import { ReportDto } from "src/reports/dtos/report.dto";
import { UpdateReportDto } from "src/reports/dtos/update-report.dto";

export class ReportUpdatedEvent implements IAggregateEvent{
  constructor(public readonly reportDto : ReportDto){}
  get streamName(){
    return `report - ${this.reportDto.reportId}`
  }
}