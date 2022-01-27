import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreatUserDto {
  
  @IsEmail()
  email: string

  @IsString()
  password: string
}
