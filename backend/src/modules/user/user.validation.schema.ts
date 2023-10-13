import * as joi from "joi";

export const CreateUserSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().optional(),
});

export const LoginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
