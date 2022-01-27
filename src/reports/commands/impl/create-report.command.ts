import { ICommand } from "@nestjs/cqrs";
import { CreateReportDto } from "../../dtos/create-report.dto";
import { User } from "../../../users/user.entity";

export class CreateReportCommand implements ICommand{
  constructor(
    public createReportDto: CreateReportDto){}
}