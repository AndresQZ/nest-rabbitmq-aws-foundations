import { RabbitRPC , RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { CONSUMER_QUEUE_NAME } from 'src/constans/constants';
import { AppConfigService, CONFIG_SERVICE_TOKEN } from 'src/interfaces/AppConfigService';
import { UtilService } from 'src/utils/UtilService';


@Injectable()
export class ConsumerService {

  constructor(@Inject(CONFIG_SERVICE_TOKEN) appConfigService: AppConfigService,private readonly utilService: UtilService) {
    console.log(`CONSUMER_QUEUE_NAME::: ${CONSUMER_QUEUE_NAME}`)
    console.log(`CONSUMER_QUEUE_NAME FROM PROCESS::: ${process.env.QUEUE_NAME}`)
  }
  
@RabbitSubscribe({
        exchange: '',
        routingKey: '',
        queue:  'rcp_queue',
        createQueueIfNotExists:false,
})
  public async consumerHandler(msg: Object) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
    this.utilService.processData(JSON.stringify(msg));
  }

  public static consumerErrorHandler(message:Object) {
    console.log(`consumerErrorHandler: ${JSON.stringify(message)}`);
  }
}