import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { ConsumerService } from 'src/services/consumer.service';
import { UtilsModule } from './UtilsModule';

import {ConfigService, ConfigModule} from '@nestjs/config';

import { EXCHANGE_NAME , EXCHANGE_TYPE, RABBIMQ_CONNECTION, RABBIMQ_CONNECTION_KEY} from '../constans/constants';

import { AppConfigService, CONFIG_SERVICE_TOKEN } from 'src/interfaces/AppConfigService';
import { ConfigInitModule } from './ConfigInit.module';
import { RabbitService } from 'src/services/RabbitService';
import { ConsumerRPCService } from 'src/services/consumer-rpc.service';


@Global()
@Module({
  imports: [
    UtilsModule,
    ConfigInitModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigInitModule],
      useFactory: async (appConfigService : AppConfigService ) => ({
        exchanges: [
          {
            name : appConfigService.get(EXCHANGE_NAME),
            type: appConfigService.get(EXCHANGE_TYPE)
          },
        ],
        uri: appConfigService.get(RABBIMQ_CONNECTION_KEY),
        connectionInitOptions: { wait: false, reject: false }
      }),
      inject: [CONFIG_SERVICE_TOKEN]
    }),
    // RabbitMQModule.forRoot(RabbitMQModule, {
    //   exchanges: [
    //     {
    //       name: 'amq.direct',
    //       type: 'direct',
    //     },
    //   ],
    //   uri: 'amqp://guest:guest@localhost:5672',
    //   connectionInitOptions: { wait: false, reject: false },
    // }),
  ],
  providers: [ConsumerService, RabbitService, ConsumerRPCService],
  exports: [ConsumerService,RabbitMQModule ]
})
export class RabbitModule {}