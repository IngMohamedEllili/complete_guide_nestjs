import { Body, CacheInterceptor, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/entities/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guars/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy, Ctx, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';

@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(
    /* @Inject('REPORT_SERVICE') private readonly client: ClientProxy, */
    private reportService: ReportsService,
    ){}

  /*   @MessagePattern('time.us.*')
    getDate(@Payload() data: number[], @Ctx() context: RedisContext) {
      console.log(`Subject: ${context.getChannel()}`); // e.g. "time.us.east"
      return new Date().toLocaleTimeString();
    } */


  @Post()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AdminGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User): Promise<any>{
    return this.reportService.createRepo(body, user)
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AdminGuard)
  @ApiOperation({summary: 'this get all reports'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'reports Found'})
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
