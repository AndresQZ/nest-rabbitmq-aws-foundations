import { RabbitRPC , RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
@RabbitSubscribe({
        exchange: '',
        routingKey: '',
        queue: 'rpc-queue',
})
    

  public async pubSubHandler(msg: {}) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}