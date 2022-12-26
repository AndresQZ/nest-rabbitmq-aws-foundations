import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { CONSUMER_QUEUE_NAME } from 'src/constans/constants';
import { AppConfigService, CONFIG_SERVICE_TOKEN } from 'src/interfaces/AppConfigService';
import { Profiguration } from 'src/config/profiguration';
import { ConsumeMessage, Channel } from 'amqplib' 


@Injectable()
export class ConsumerRPCService {

  constructor(@Inject(CONFIG_SERVICE_TOKEN) appConfigService: AppConfigService) {}


@RabbitRPC({
  exchange: '',
  routingKey: '',
  queue: 'service.name.action.queue.name',
  createQueueIfNotExists:false,
  errorHandler: function (this: ConsumerRPCService, channel: Channel, msg: ConsumeMessage, error: Error) {
              this.consumerErrorHandler(msg, error)
  }
})


public async consumerRPCHandler(msg: Object) {
  console.log(`Received message: ${JSON.stringify(msg)}`);
  return {
    response: 'response from rabbitmq-aws-foundations-RPC',
  };
}


  public consumerErrorHandler(message:Object,error: Error ) {
    console.log(`consumerErrorHandler: ${JSON.stringify(message)}`);
  }


}