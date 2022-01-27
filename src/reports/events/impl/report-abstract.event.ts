import { IAggregateEvent } from "nestjs-eventstore";
import { ReportDto } from "src/reports/dtos/report.dto";

export class ReportAbstractEvent implements IAggregateEvent{
  constructor(public readonly reportDto : ReportDto){}
  
  get streamName(){
    return `report -${this.reportDto.reportId}`
  }
}