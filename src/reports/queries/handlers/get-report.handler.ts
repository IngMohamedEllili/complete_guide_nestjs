import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "src/reports/entities/report.entity";
import { Repository } from "typeorm";
import { GetReportQuery } from "../impl/get-report.query";

@QueryHandler(GetReportQuery)
export class GetReportHandler implements IQueryHandler<GetReportQuery>{

  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>
  ){}

  async execute(query: GetReportQuery): Promise<Report[]> {
    return await this.reportRepo.find({relations : ['user']})
    }

  }
