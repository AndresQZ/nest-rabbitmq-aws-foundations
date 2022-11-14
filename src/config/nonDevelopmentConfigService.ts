import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RABBIMQ_CONNECTION_KEY } from "src/constans/constants";
import { AppConfigService } from "src/interfaces/AppConfigService";

@Injectable()
export class NonDevelopmentConfigService implements AppConfigService {

    constructor(private configService: ConfigService) {
        console.log(`using NonDevelopmentConfigService:::: Implementation`)
    }

    private enviromentsVariables: Record<string, string> = { 
        'RABBIT_MQ_CONNEXION': process.env.RABBIMQ_CONNECTION,
        'QUEUE_NAME': process.env.QUEUE_NAME,
        'EXCHANGE_NAME' : process.env.EXCHANGE_NAME,
        'EXCHANGE_TYPE': process.env.EXCHANGE_TYPE,
        [RABBIMQ_CONNECTION_KEY]: process.env.RABBIMQ_CONNECTION
    };

    static RABBIT_MQ_CONNEXION  = process.env.RABBIMQ_CONNECTION;

    public get(envName: string) : any {
     return this.findEnviromentVariable(envName); 
    }

     
    getInitCredentialsAWS(): undefined {
        return undefined
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
        console.log(`resolved value ::: ${result}`)
        return result
    }
}