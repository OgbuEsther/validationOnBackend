import Joi from "joi";

export const productSchemaValidator = {
  post: Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    productImage: Joi.string().required(),
    category: Joi.string().required(),
  }),
};
