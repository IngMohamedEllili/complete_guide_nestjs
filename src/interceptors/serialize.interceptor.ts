import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { plainToClass } from "class-transformer";

interface ClassConstructor{
  new (...args: any[]):{}
}

export function Serialize(dto: ClassConstructor){
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
  constructor(private dto: any){}

  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
    //run something befor a request is handled
    return handler.handle().pipe(
      map((data: any)=>{
        //run something befor response
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
    
  }
}