import { RabbitRPC , RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { CONSUMER_QUEUE_NAME } from 'src/constans/constants';
import { AppConfigService, CONFIG_SERVICE_TOKEN } from 'src/interfaces/AppConfigService';
import { UtilService } from 'src/utils/UtilService';
import { Profiguration } from 'src/config/profiguration';
import { ConsumeMessage, Channel } from 'amqplib' 


@Injectable()
export class ConsumerService {

  constructor(@Inject(CONFIG_SERVICE_TOKEN) appConfigService: AppConfigService,private readonly utilService: UtilService) {
    console.log(`CONSUMER_QUEUE_NAME FROM PROCESS:::MODULE FIRST ${process.env.QUEUE_NAME}`)
    console.log(`proconfig FROM PROCESS:::MODULE FIRST ${Profiguration.get(CONSUMER_QUEUE_NAME)}`)
  }

  
@RabbitSubscribe({
        exchange: '',
        routingKey: '',
        queue:  Profiguration.get(CONSUMER_QUEUE_NAME),
        createQueueIfNotExists:false,
        errorHandler: function (this: ConsumerService, channel: Channel, msg: ConsumeMessage, error: Error) {
          this.consumerErrorHandler(msg, error)
        }
})


  public async consumerHandler(msg: Object) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
    this.utilService.processData(JSON.stringify(msg));
  }

  public consumerErrorHandler(message:Object,error: Error ) {
    console.log(`consumerErrorHandler: ${JSON.stringify(message)}`);
  }


}