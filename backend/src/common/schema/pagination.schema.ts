import * as joi from "joi";

export const PaginationSchema = joi.object().keys({
  skip: joi.number().optional().default(0),
  limit: joi.number().optional().default(10),
});
