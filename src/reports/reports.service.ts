import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportCommand } from './commands/impl/create-report.command';
import { DeleteReportCommand } from './commands/impl/delete-report.command';
import { UpdateReportCommand } from './commands/impl/update-report.command';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { GetOneReport } from './queries/impl/get-one-report.query';
import { GetReportQuery } from './queries/impl/get-report.query';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>,
    private readonly _commandBus : CommandBus,
    private readonly _queryBus : QueryBus
    ){}

  async findReports(){
    return this._queryBus.execute(new GetReportQuery())
  }

  async findReport(id : number){
    return this._queryBus.execute(new GetOneReport(id))
  }
  async createRepo(reportDto: CreateReportDto, user: User){
    Logger.log('created Report Service ...')
   return await this._commandBus.execute(new CreateReportCommand(reportDto, user))
  }

  async deleteRepo(id: string){
    return this._commandBus.execute(new DeleteReportCommand(parseInt(id)))
  }

  async updateReport(id: string, updateReportDto : UpdateReportDto, user: User){
    return this._commandBus.execute(new UpdateReportCommand(updateReportDto, parseInt(id),user))
  }

  async changeApproval(id: string, approved: boolean){
    const report = await this.repo.findOne(id)
    if(!report){
      throw new NotFoundException("report not found")
    }
    report.approved = approved;
    return this.repo.save(report)
  }

  createEstimate(estimateDto : GetEstimateDto){
    return this.repo
    .createQueryBuilder()
    .select('AVG(price)','price')
    .where('make = :make', {make: estimateDto.make})
    .andWhere('model = :model', {model: estimateDto.model})
    .andWhere('lng - :lng BETWEEN -5 AND 5',{ lng : estimateDto.lng})
    .andWhere('lat - :lat BETWEEN -5 AND 5',{ lat : estimateDto.lat})
    .andWhere('year - :year BETWEEN -3 AND 3',{ year : estimateDto.year})
    .andWhere('approved IS TRUE')
    .orderBy('ABS(mileage - :mileage)','DESC')
    .setParameters({mileage : estimateDto.mileage})
    .limit(3)
    .getRawOne()
  }  

}
