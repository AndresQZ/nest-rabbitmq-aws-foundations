import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { DynamoManagerModule } from './DynamoManager.module';

@Module({
  imports: [
    DynamoManagerModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          region: 'us-east-1',
          credentials: new SharedIniFileCredentials({
            profile: 'landresqz',
          }),
        }
      },
    }),
  ],
  providers: [],
  exports: [DynamoManagerModule],
})
export class AwsSdkInitModule {}