import { ConfigService } from "@nestjs/config";
import { RABBIT_MQ_LOCAL } from "src/constans/constants";
import { AppConfigService } from "src/interfaces/AppConfigService";
import { SharedIniFileCredentials } from 'aws-sdk';


export class DevelopmentConfigService implements AppConfigService {

    constructor(public configService: ConfigService) {
        console.log(`using DevelopmentConfigService:::: Implementation`)
    }

    private enviromentsVariables: Record<string, string> = {
        'RABBIT_MQ_CONNEXION': RABBIT_MQ_LOCAL,
        'QUEUE_NAME': process.env.QUEUE_NAME,
        'EXCHANGE_NAME' : process.env.EXCHANGE_NAME,
        'EXCHANGE_TYPE': process.env.EXCHANGE_TYPE,
        'rabbitMQ.connection': process.env.RABBIMQ_CONNECTION,
        'AWS_SDK_REGION': process.env.AWS_REGION,
        'ENVIRONMENT': process.env.env
    };

    static RABBIT_MQ_CONNEXION  = process.env.RABBIMQ_CONNECTION;

    public get(envName: string) : any {
     return this.findEnviromentVariable(envName); 
    }

    public getInitCredentialsAWS (): SharedIniFileCredentials  {
      return new SharedIniFileCredentials({
            profile: process.env.AWS_PROFILE
        })
    }


    private  findEnviromentVariable( variableName: string) {
        console.log(`variableName::: ${JSON.stringify(variableName)}`)
        let result = null;
        for (const [key, value] of Object.entries(this.enviromentsVariables)) {
            console.log(`key:: ${key} - value :: ${value}`);
            if (key == variableName) {
                result = value
            }

        }
        
        
       // const result =  Object.entries(this.enviromentsVariables).find((variable: String) => variable === variableName);
        console.log(`result::: ${result}`)
        return result
    }
}