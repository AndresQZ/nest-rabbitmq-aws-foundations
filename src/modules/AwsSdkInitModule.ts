import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { DynamoManagerModule } from './DynamoManager.module';
import { AppConfigService, CONFIG_SERVICE_TOKEN } from 'src/interfaces/AppConfigService';
import { ConfigInitModule } from './ConfigInit.module';
import { AWS_SDK_REGION } from 'src/constans/constants';



@Module({
  imports: [
    DynamoManagerModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigInitModule],
        inject: [CONFIG_SERVICE_TOKEN],
        useFactory: (appConfigService : AppConfigService) => ({
          region: appConfigService.get(AWS_SDK_REGION),
          credentials: appConfigService.getInitCredentialsAWS()
        }),
      },
    })
    // AwsSdkModule.forRootAsync({
    //   defaultServiceOptions: {
    //     useValue: {
    //       region: 'us-east-1',
    //       credentials: new SharedIniFileCredentials({
    //         profile: 'landresqz',
    //       }),
    //     }
    //   },
    // }),
  ],
  providers: [],
  exports: [DynamoManagerModule],
})
export class AwsSdkInitModule {}