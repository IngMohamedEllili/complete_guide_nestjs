import { CreateReportHandler } from "./create-report.handler";
import { DeleteReportHandler } from "./delete-report.handler";
import { UpdateReportHandler } from "./update-report.handler";

export const ReportHandlers = [
  UpdateReportHandler,
  CreateReportHandler,
  DeleteReportHandler
]