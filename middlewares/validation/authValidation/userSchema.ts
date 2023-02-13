import joi from "joi";

export const userSchemaValidator = {
  register: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required().alphanum(),
    confirm: joi.string().min(6).required().valid(joi.ref("password")),
  }),
  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
};
