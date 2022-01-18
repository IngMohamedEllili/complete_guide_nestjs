import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number)=>{
        return Promise.resolve({id, email:'asdf@asdf.com', password:'pass'} as User)
      },
      find: (email: string)=>{
        return Promise.resolve([{id:1, email, password:'pass'} as User])
      },
      /* update: ()=>{},
      remove: ()=>{} */
    }
    fakeAuthService = {
      //signup: ()=>{}
      signin: (email: string, password: string)=>{
        return Promise.resolve({id: 1, email, password} as User)
      } 
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users', async()=>{
    const users = await controller.findAllUsers('adada@adad.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('adada@adad.com')
  })

  it('find one user',async()=>{
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  })

  it('find user throws an error if user id is not found', (done)=>{
    fakeUserService.findOne = () => null
    controller.findUser('1').catch(err => done())
  })

  it('signin updates session object and return user', async()=>{
    const session = {userId: -10}
    const user = await controller.signin({email: 'aaa@aa.com', password:'aaaa'}, session)
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1);
  })
});
