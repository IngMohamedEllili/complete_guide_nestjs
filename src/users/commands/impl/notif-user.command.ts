import { ICommand } from '@nestjs/cqrs';
import { CreateReportDto } from 'src/reports/dtos/create-report.dto';
import { User } from 'src/users/entities/user.entity';

export class UserNotificationCommand implements ICommand {
  constructor(public readonly user: User) {}
}
