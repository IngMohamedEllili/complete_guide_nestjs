import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guars/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { UpdateReportDto } from './dtos/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportService: ReportsService,
    ){}

  @Post()
  @UseGuards(AdminGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User): Promise<any>{
    return this.reportService.createRepo(body, user)
  }

  @Get()
  getAll(){
    return this.reportService.findReports()
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto){
    return this.reportService.changeApproval(id, body.approved)
  }

 @Get("/price")
  getEstimate(@Query() query: GetEstimateDto){
    return this.reportService.createEstimate(query)
  } 

  @Get('/:id')
  findReport(@Param("id") id: number){
    return this.reportService.findReport(id)
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteReport(@Param("id") id: string){
    return this.reportService.deleteRepo(id)
  }

  @Patch('/update/:id')
  @UseGuards(AdminGuard)
  updateReport(@Param('id') id: string, @Body() body: UpdateReportDto ,@CurrentUser() user: User){
    return this.reportService.updateReport(id, body, user)
  }
}
