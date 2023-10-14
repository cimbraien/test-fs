import * as joi from "joi";
import JoiObjectId from "joi-objectid";
const objectId = JoiObjectId(joi);

export const FindByIdSchema = joi.object().keys({
  id: objectId().required(),
});
