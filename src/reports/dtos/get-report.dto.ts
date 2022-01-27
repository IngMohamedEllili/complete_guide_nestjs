import { Expose } from "class-transformer"
import { IsString } from "class-validator"

export class GetReportDto{

  @Expose()
  @IsString()
  make: string
  
  @Expose()
  @IsString()
  model: string
}