import { Body, CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  
  constructor(
    private readonly appService: AppService) {}

  
  
  @Get("auto-cache")
  @CacheKey('mycustomkey')
  @CacheTTL(500)
  get(name: string): string{
    return this.appService.getHello(name)
  }

}
