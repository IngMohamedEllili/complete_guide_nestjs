import { ICommand } from "@nestjs/cqrs";
import { CreateReportDto } from "../../dtos/create-report.dto";
import { User } from "../../../users/user.entity";
import { Logger } from "@nestjs/common";

export class CreateReportCommand implements ICommand{
  constructor(
    public createReportDto: CreateReportDto,
    public user: User){Logger.log(' create report Command CQRS')}
    
}