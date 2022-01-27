import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { User } from "./user.entity";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService{
  constructor(private userService: UsersService
    ){}

  async signup(email: string, password: string){
    // fetch if email in use
    const useremail = await this.userService.find(email)
    if(useremail.length){
      throw new BadRequestException("email in use")
    }

    //hash the users password
      //generate a salt
    const salt = randomBytes(8).toString('hex')
      //hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer
      // join the hashed result with salt
    const result = salt + '.' + hash.toString('hex')
    //create user
    const user = await this.userService.create(email,result)
    return user;

  }

  async signin(email: string, password: string){
    const [user] = await this.userService.find(email)
    if(!user){
      throw new NotFoundException("user not found")
    }
    const [salt, storedHash] = user.password.split('.')
    const hash = (await scrypt(password, salt, 32)) as Buffer

    if(hash.toString('hex') !== storedHash){
      throw new BadRequestException("incorrect password")    
    }
    return user
  }
}
