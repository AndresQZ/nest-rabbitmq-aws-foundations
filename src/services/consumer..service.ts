import { RabbitRPC , RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UtilService } from 'src/utils/UtilService';

@Injectable()
export class ConsumerService {

  constructor(private readonly utilService: UtilService) {}
  
@RabbitSubscribe({
        exchange: '',
        routingKey: '',
        queue: 'rpc-queue',
})
  public async consumerHandler(msg: Object) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
    this.utilService.processData(JSON.stringify(msg));
  }
}