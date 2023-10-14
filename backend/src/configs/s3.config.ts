import { S3ClientConfig } from "@aws-sdk/client-s3";

export const S3Config: S3ClientConfig = {
  region: process.env.AWS_REGION || "ap-southeast-3",
};

export const S3Bucket = process.env.S3_BUCKET || "klontong";