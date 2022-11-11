import { Module } from '@nestjs/common';
import { CONFIG_SERVICE_TOKEN } from 'src/interfaces/appConfigService';
import { DevelopmentConfigService } from 'src/config/developmentConfigService';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NonDevelopmentConfigService } from 'src/config/nonDevelopmentConfigService';

const configFactory = {
    provide: CONFIG_SERVICE_TOKEN,
    useFactory: (configService: ConfigService) : any => {
        let implementationConfigService = null
        console.log(`ENVRIROMENT:::: ${process.env.env}`)
        switch (process.env.env) {
            case 'development':
                implementationConfigService =  new DevelopmentConfigService(configService)
                break;        
            default:
                implementationConfigService = new NonDevelopmentConfigService(configService)
                break;
        }
        return implementationConfigService;
    },
    inject: [ConfigService]
  };


@Module({
    imports: [ConfigModule],
    providers: [configFactory],
    exports: [CONFIG_SERVICE_TOKEN]
})


export class ConfigInitModule  {}

