import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing'
import { doesNotMatch } from 'assert';
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { UsersService } from './users.service'


describe('AuthService', ()=>{
  let service: AuthService;
  let fakeUserService: Partial<UsersService>

beforeEach(async () =>{
  //create a fake copy of the users service
  const users: User[] = []
  fakeUserService = {
    
    find: (email: string)=> {
      const filtredUser = users.filter(user => user.email === email)
      return Promise.resolve(filtredUser);
    },
    create: (email: string, password: string) => {
      const user = {id: Math.floor(Math.random()*9999), email, password} as User
      users.push(user)
      return Promise.resolve(user);
    }
      
  }
  
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide:UsersService,
        useValue: fakeUserService
      }
    ]
  }).compile()
  service = module.get(AuthService);
})

 it('can create an instance of auth service', async ()=> {
  expect(service).toBeDefined()
 })

 it('create a news user with salted and hashed password', async()=>{
   const user = await service.signup('ass@test.com','asdf')
   expect(user.password).not.toEqual('asdf')
   const [salt, hash] = user.password.split('.');
   expect(salt).toBeDefined();
   expect(hash).toBeDefined();
 })

 it('throws an error if user signs up with email that is in used', (done) => {
  fakeUserService.find = () => Promise.resolve([{id: 1, email: 'as', password: 'wsdsad'} as User]);
  service.signup('asdf@asdf.com', 'asdf').catch(e => done());
  });

  it('throws if signin is called with unused email', (done) =>{
    service.signin('asdflkj@asdflkj.com','pass').catch(err =>done())
    }
  )

  it('throws if an invalid password is provided',(done)=>{
    service.signup('ddazda@dada.com','asdf')
    service.signin('asdf@asdf.com', 'asdf').catch(e => done());
  })

  it('return a user if correct password is provided', (done)=>{
    service.signup('asdf@asdf.com','mypassword')
    const user =  service.signin('asdf@asdf.com', 'mypassword1').catch(e => done());
    expect(user).toBeDefined();
    
  })
})