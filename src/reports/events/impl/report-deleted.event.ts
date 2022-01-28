import { Logger } from "@nestjs/common";
import { IAggregateEvent } from "nestjs-eventstore";
import { ReportDto } from "src/reports/dtos/report.dto";

export class DeletedReportEvent implements IAggregateEvent{
  get streamName(){
    return `report deleted`
  }
}