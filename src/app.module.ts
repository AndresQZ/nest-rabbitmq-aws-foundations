import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './modules/rabbitMQ.module';

import { AwsSdkInitModule } from './modules/AwsSdkInitModule';
import { UtilsModule } from './modules/UtilsModule';


import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { ConfigInitModule } from './modules/ConfigInit.module';



@Module({
  imports: [ConfigModule.forRoot({isGlobal: false, load: [configuration]}),ConfigInitModule, RabbitModule, AwsSdkInitModule, UtilsModule ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}