import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "src/reports/entities/report.entity";
import { Repository } from "typeorm";
import { GetOneReport } from "../impl/get-one-report.query";

@QueryHandler(GetOneReport)
export class GetOneReportHandler implements IQueryHandler<GetOneReport>{
  constructor( @InjectRepository(Report) private readonly repo : Repository<Report>){}
  
  async execute(query: GetOneReport): Promise<any> {
    const {id} = query
    return this.repo.findOne(id)
  }
}