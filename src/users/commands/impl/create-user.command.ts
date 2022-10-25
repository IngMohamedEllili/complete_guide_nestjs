import { ICommand } from '@nestjs/cqrs';
import { CreatUserDto } from 'src/users/dtos/create-user.dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly createUserDto: CreatUserDto) {}
}
