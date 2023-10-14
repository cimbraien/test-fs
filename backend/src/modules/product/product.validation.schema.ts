import * as joi from "joi";
import JoiObjectId from "joi-objectid";
const objectId = JoiObjectId(joi);

export const CreateProductCategorySchema = joi.object().keys({
  name: joi.string().required().alphanum().max(20),
});

export const CreateProductSchema = joi.object().keys({
  categoryId: objectId().required(),
  name: joi.string().required(),
  sku: joi.string().optional().default(null),
  description: joi.string().optional().default(null),
  weight: joi.number().required(),
  length: joi.number().required(),
  height: joi.number().required(),
  imageUrl: joi.string().optional().default(null),
  price: joi.number().integer().required(),
});
