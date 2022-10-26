import { Report } from '../../reports/entities/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { AbstractEntity } from './abstract.entity';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../dtos/user.dto';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsrt() {
    console.log('Inserted User with ID ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with ID ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with ID ', this.id);
  }

  toDto() {
    return plainToClass(UserDto, this);
  }
}
