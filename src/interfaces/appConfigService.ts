export const CONFIG_SERVICE_TOKEN = 'CONFIG_SERVICE_TOKEN';
import { SharedIniFileCredentials } from 'aws-sdk';


export interface AppConfigService {
    get(envName: string) : any 
    getInitCredentialsAWS (): SharedIniFileCredentials | undefined
}