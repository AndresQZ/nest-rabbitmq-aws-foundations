import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConsumerService } from 'src/services/consumer..service';
import { UtilsModule } from './UtilsModule';

@Module({
  imports: [
    UtilsModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'amq.direct',
          type: 'direct',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false, reject: false },
    }),
  ],
  providers: [ConsumerService],
  exports: [ConsumerService]
})
export class RabbitModule {}