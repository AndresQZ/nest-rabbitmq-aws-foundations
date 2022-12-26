import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RabbitService {

  private readonly logger = new Logger(RabbitService.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}
    

  public sendMessage (queue: string, payload: any) : void {
    this.logger.log(`starting sendMessage(), queue: ${queue}, payload: ${JSON.stringify(payload)}`)
    this.amqpConnection.publish('', queue, payload);
  }
   
}