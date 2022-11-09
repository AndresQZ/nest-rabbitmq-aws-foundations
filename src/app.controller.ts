import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { DynamoManagerService } from './services/dynamo-manager.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly s3: DynamoManagerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('/bucket')
  getButckets(): Promise<string[]> {
    return this.s3.listBucketContents('personal-bucket-simple-user');
  }

}
