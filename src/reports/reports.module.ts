import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportHandlers } from './commands/handler';
import { ReportCreatedHandler } from './events/handlers/report-created.handler';
import { QueryHandlers } from './queries/handlers';
import { Report } from './entities/report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { DeletedReportHandler } from './events/handlers/report-deleted.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    CqrsModule,
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    DeletedReportHandler,
    ReportCreatedHandler,
    ...ReportHandlers,
    ...QueryHandlers]
  })
export class ReportsModule {}
