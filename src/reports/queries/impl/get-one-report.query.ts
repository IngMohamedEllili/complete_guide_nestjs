import { IQuery } from "@nestjs/cqrs";

export class GetOneReport{
  constructor(public readonly id: number){}
}