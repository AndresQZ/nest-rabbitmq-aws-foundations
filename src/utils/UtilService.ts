import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {

    

  public processData (payload: string) :void {
    console.log(`Payload::::: ${payload}` )
  }
}