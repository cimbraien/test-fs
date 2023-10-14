import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { injectable } from "inversify";
import { S3Bucket, S3Config } from "../../configs/s3.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { UUID } from "bson";

@injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string = S3Bucket;
  constructor() {
    this.s3 = new S3Client(S3Config);
  }

  async getPresignedUploadUrl() {
    const key = new UUID().toString();
    const command = new PutObjectCommand({ Bucket: this.bucket, Key: key });
    const presignedUrl = await getSignedUrl(this.s3, command, { expiresIn: 15 * 60 });
    return { key, presignedUrl };
  }
}
