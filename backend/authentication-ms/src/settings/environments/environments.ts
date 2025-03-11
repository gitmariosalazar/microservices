import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentsVariables {
  PORT: number;
  DATABASE_PROVIDER: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_NAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOSTNAME: string;
  MONGODB_URI: string;
  DATABASE_URL: string;
  SECRET_KEY: string;
  SALT_ROUNDS: number;
}

const environmentsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_PROVIDER: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
    DATABASE_USERNAME: joi.string().required(),
    DATABASE_NAME: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    DATABASE_HOSTNAME: joi.string().required(),
    MONGODB_URI: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    SECRET_KEY: joi.string().required(),
    SALT_ROUNDS: joi.number().default(10),
  })
  .unknown(true);

const { error, value } = environmentsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const environmentsVariables: EnvironmentsVariables = value;
export const environments = {
  serverPort: environmentsVariables.PORT,
  databasePort: environmentsVariables.DATABASE_PORT,
  databaseProvider: environmentsVariables.DATABASE_PROVIDER,
  databaseUsername: environmentsVariables.DATABASE_USERNAME,
  databaseName: environmentsVariables.DATABASE_NAME,
  databaseHostname: environmentsVariables.DATABASE_HOSTNAME,
  databasePassword: environmentsVariables.DATABASE_PASSWORD,
  mongodbURI: environmentsVariables.MONGODB_URI,
  databaseURL: environmentsVariables.DATABASE_URL,
  secretKey: environmentsVariables.SECRET_KEY,
  saltRound: environmentsVariables.SALT_ROUNDS,
};
