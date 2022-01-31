import { IAggregateEvent } from "nestjs-eventstore";
import { UserDto } from "src/users/dtos/user.dto";

export class CreatedUserEvent implements IAggregateEvent{
  constructor(public readonly userDto: UserDto){}
  get streamName(){
    return `user - ${this.userDto.id}`
  }
}