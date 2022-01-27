import { ICommand } from "@nestjs/cqrs";
import { UpdateReportDto } from "src/reports/dtos/update-report.dto";
import { User } from "src/users/user.entity";

export class UpdateReportCommand implements ICommand{
  constructor(
    public readonly updateReportDto : UpdateReportDto,
    public readonly id: number, 
    public readonly user: User
  ){}
}