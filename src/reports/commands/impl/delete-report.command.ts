import { Logger } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';
import { User } from 'src/users/entities/user.entity';

export class DeleteReportCommand implements ICommand {
  constructor(public id: number) {
    Logger.log(' deleted report Command CQRS');
  }
}
