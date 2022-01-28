
import { Exclude, Expose, Transform } from "class-transformer";
import { AbstractDto } from "./abstract.dto";


export class ReportDto extends AbstractDto{

  @Expose()
  reportId: number
  
  @Expose()
  price: number
  
  @Expose()
  year: number

  @Expose()
  lng: number

  @Expose()
  lat: number

  @Expose()
  make: string

  @Expose()
  model: string

  @Expose()
  mileage: string

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  approved: Boolean

}