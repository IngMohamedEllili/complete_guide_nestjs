import { User } from "../../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { plainToClass } from "class-transformer";
import { AggregateRoot } from "@nestjs/cqrs";
import { IAggregateEvent } from "nestjs-eventstore";

@Entity()
export class Report extends AggregateRoot<IAggregateEvent>{

  @PrimaryGeneratedColumn()
  userID: number

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number

  @Column()
  make: string

  @Column()
  model: string

  @Column()
  year: number

  @Column()
  lng: number

  @Column()
  lat: number

  @Column()
  mileage: number

  @ManyToOne(()=> User, (user) => user.reports)
  user: User

  toDto(){
    return plainToClass(Report, this)
  }
  
  }