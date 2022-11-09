import { Module } from '@nestjs/common';
import {UtilService} from '../utils/UtilService';

@Module({
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilsModule {}