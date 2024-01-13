import dotenv from "dotenv";
import Joi from "joi";
import { logger } from "../middlewares/logger.js";

dotenv.config();

const envVarsSchema = Joi.object({
  PORT: Joi.number().integer().default(4000),
  MONGODB_URI: Joi.string().trim(),
  CORS_ORIGIN: Joi.string().trim(),
  DATABASE_NAME: Joi.string().trim(),
  JWT_SECRET_KEY: Joi.string().trim(),
  ACCESS_TOKEN_SECRET: Joi.string().trim(),
  ACCESS_TOKEN_EXPIRY: Joi.string().trim(),
  REFRESH_TOKEN_SECRET: Joi.string().trim(),
  REFRESH_TOKEN_EXPIRY: Joi.string().trim(),
  BASE_URL: Joi.string().trim(),
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
  base_url: envVars.BASE_URL,
  jwt: {
    JWT_SECRET_KEY: envVars.JWT_SECRET_KEY,
    accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
    expiresInAccess: envVars.ACCESS_TOKEN_EXPIRY,
    refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
    expiresInRefresh: envVars.REFRESH_TOKEN_EXPIRY,
  },
};
