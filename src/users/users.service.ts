import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportCommand } from 'src/reports/commands/impl/create-report.command';
import { Repository } from 'typeorm';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { CreatUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>,
  private readonly _command: CommandBus){}

  create(createUserDto: CreatUserDto){
    return this._command.execute(new CreateUserCommand(createUserDto))
  }

  findOne(id: number){
    if(!id){
      return null
    }
    const user = this.repo.findOne(id)
    if (!user){
      throw new NotFoundException('user not found')
    }
    return user
  }

  find(email: string){
    const user = this.repo.find({email})
    return user
  }

  findAll(){
    return this.repo.find()
  }
  

  async update(id: number, attrs: Partial<User>){
    const user = await this.findOne(id)
    if (!user){
      throw new NotFoundException('user not found')
    }
    Object.assign(user, attrs)
    return this.repo.save(user);
  }

  async remove(id: number){
    const user = await this.findOne(id)
    if (!user){
      throw new NotFoundException('user not found')
    }
    this.repo.remove(user);
  }

}
