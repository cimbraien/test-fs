import { inject, injectable } from "inversify";
import IController from "../../interfaces/controller.interface";
import { S3Service } from "./s3.service";
import { Request, Response } from "express";
import { OkResponse } from "../../common/responses/ok.response";
import { type } from "../../constants/inversify.constant";

@injectable()
export class ImageController extends IController {
  constructor(@inject(type.S3Service) private readonly s3Service: S3Service) {
    super();
  }

  async getUploadUrl(req: Request, res: Response) {
    const data = await this.s3Service.getPresignedUploadUrl();

    return new OkResponse(res, { data });
  }
}
