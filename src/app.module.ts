import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './modules/rabbitMQ.module';

@Module({
  imports: [RabbitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
