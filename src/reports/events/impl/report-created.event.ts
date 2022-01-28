import { IAggregateEvent } from "nestjs-eventstore";
import { ReportDto } from "src/reports/dtos/report.dto";


export class ReportCreatedEvent implements IAggregateEvent{
  constructor(public readonly reportDto : ReportDto){}
  
  get streamName(){
    return `report - ${this.reportDto.reportId}`
  }
}