import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 , DynamoDB} from 'aws-sdk';
import { DynamoManagerService } from '../services/dynamo-manager.service';

@Module({
  imports: [AwsSdkModule.forFeatures([DynamoDB, S3])],
  providers: [DynamoManagerService],
  exports: [DynamoManagerService],
})
export class DynamoManagerModule {}