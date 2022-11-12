import { createProfiguration } from '@golevelup/profiguration';
import { Config } from 'src/interfaces/config';

//https://github.com/golevelup/ts-ecosystem/tree/master/libs/profiguration

export const Profiguration = createProfiguration<Config>(
  {
    consumerQueueName: {
        default: 'queue.name.default',
        env: 'QUEUE_NAME'
    }
}, 
{
    strict: false,
    verbose: true,
    loadRelativeTo: 'cwd',
    configureEnv: () => ({
      files: `.env`
    })
  }
);