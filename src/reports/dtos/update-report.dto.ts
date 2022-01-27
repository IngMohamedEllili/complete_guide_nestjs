import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateReportDto {
  @IsString()
  @IsOptional()
  make: string

  @IsString()
  @IsOptional()
  model: string

  
  @IsNumber()
  @IsOptional()
  year: number

  @IsLongitude()
  @IsOptional()
  lng: number

  @IsLatitude()
  @IsOptional()
  lat: number

  @IsNumber()
  @IsOptional()
  mileage: number
}