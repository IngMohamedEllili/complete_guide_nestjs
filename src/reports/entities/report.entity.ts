import { User } from "../../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { plainToClass } from "class-transformer";
import { ReportCreatedEvent } from "../events/impl/report-created.event";
import { ReportDto } from "../dtos/report.dto";
import { AbstractEntity } from "./abstract.entity";
import { CreateReportDto } from "../dtos/create-report.dto";

@Entity()
export class Report extends AbstractEntity{
  @PrimaryGeneratedColumn()
  reportId: number

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
    return plainToClass(ReportDto, this)
  }
  

  }