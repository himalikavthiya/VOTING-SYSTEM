import dotenv from "dotenv";
import Joi from "joi";
import { logger } from "../middlewares/logger.js";

dotenv.config();

const envVarsSchema = Joi.object({
  PORT: Joi.number().integer().default(4000),
  CORS_ORIGIN: Joi.string().trim(),
  MONGODB_URI: Joi.string().trim(),
  DATABASE_NAME: Joi.string().trim(),
  JWT_SECRET_KEY: Joi.string().trim(),
  ACCESS_TOKEN_SECRET: Joi.string().trim(),
  ACCESS_TOKEN_EXPIRY: Joi.string().trim(),
  CLOUDINARY_CLOUD_NAME: Joi.string().trim(),
  CLOUDINARY_API_KEY: Joi.string().trim(),
  CLOUDINARY_API_SECRET: Joi.string().trim(),
}).unknown(); // Allowed to any keys avilable in ENV file...

const { value: envVars, err } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (err) {
  logger.error({
    Request: JSON.stringify(req.header),
    Message: err.message,
  });
  res.status(400).josn({
    StatusaCode: 11,
    Error: `Env config error..! :-> ${err.message}`,
  });
}

export const configData = {
  port: envVars.PORT,
  origin: envVars.CORS_ORIGIN,
  mongodb: {
    url: envVars.MONGODB_URI,
    dbname: envVars.DATABASE_NAME,
  },
  jwt: {
    secretKey: envVars.JWT_SECRET_KEY,
    accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
    expiresInAccess: envVars.ACCESS_TOKEN_EXPIRY,
  },
  cloudImg: {
    c_name: envVars.CLOUDINARY_CLOUD_NAME,
    c_apiKey: envVars.CLOUDINARY_API_KEY,
    c_apiSecret: envVars.CLOUDINARY_API_SECRET,
  },
};
