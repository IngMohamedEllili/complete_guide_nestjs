import { CacheModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportHandlers } from './commands/handler';
import { ReportCreatedHandler } from './events/handlers/report-created.handler';
import { QueryHandlers } from './queries/handlers';
import { Report } from './entities/report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { DeletedReportHandler } from './events/handlers/report-deleted.handler';
import { ReportSagas } from './sagas/report.saga';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path/posix';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Report]),
    CqrsModule,
    /* ClientsModule.register([
      {
        name: 'REPORT_SERVICE',
        transport : Transport.REDIS,
        options : {
          url: 'redis://localhost:6379'
        }
      }
    ]), */
  ],
  controllers: [ReportsController],
  providers: [
    ReportSagas,
    ReportsService,
    DeletedReportHandler,
    ReportCreatedHandler,
    ...ReportHandlers,
    ...QueryHandlers]
  })
export class ReportsModule {}
