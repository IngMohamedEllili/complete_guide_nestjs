import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { EventBusProvider } from 'nestjs-eventstore';
import { CreatedUserEvent } from 'src/users/events/impl/user-created.event';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User) private readonly _repository: Repository<User>,
    private readonly _publisher: EventBusProvider,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { createUserDto } = command;
    const user = this._repository.create(createUserDto);
    const userSaved = await this._repository.save(user);
    const userToDto = userSaved.toDto();
    const event = new CreatedUserEvent(userToDto);
    this._publisher.publish(event, event.streamName);
    return userSaved;
  }
}
