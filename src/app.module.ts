import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './modules/rabbitMQ.module';

import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { AwsSdkInitModule } from './modules/AwsSdkInitModule';
import { UtilsModule } from './modules/UtilsModule';

@Module({
  imports: [RabbitModule, AwsSdkInitModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
