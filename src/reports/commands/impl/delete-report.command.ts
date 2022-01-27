import { ICommand } from "@nestjs/cqrs";

export class DeleteReportCommand implements ICommand{
  constructor(public id :number){}
}