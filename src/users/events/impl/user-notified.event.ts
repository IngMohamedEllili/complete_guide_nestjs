import { IAggregateEvent } from "nestjs-eventstore";
import { CreateReportDto } from "src/reports/dtos/create-report.dto";
import { UserDto } from "src/users/dtos/user.dto";

export class NotifiedUserEvent implements IAggregateEvent{
  constructor(public readonly user: UserDto){}
  get streamName(){
    return `report - ${this.user.email}`
  }
}