import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 , DynamoDB} from 'aws-sdk';

@Injectable()
export class DynamoManagerService {
  constructor(
    @InjectAwsService(S3) private readonly dynamoDB: S3,
  ) {
  }

  async listBucketContents(bucket: string) {
    const response = await this.dynamoDB.listObjectsV2({ Bucket: bucket }).promise();
    return response.Contents.map(c => c.Key);
  }
}