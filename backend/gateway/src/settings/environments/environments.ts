import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentsVariables {
  PORT: number;
  AUTH_MICROSERVICE_PORT: number;
  AUTH_MICROSERVICE_HOST: string;
  AUTH_SERVICE: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_SERVICE: string;
  SALES_MICROSERVICE_PORT: number;
  SALES_MICROSERVICE_HOST: string;
  SALES_SERVICE: string;
  RETURNS_MICROSERVICE_PORT: number;
  RETURNS_MICROSERVICE_HOST: string;
  RETURNS_SERVICE: string;
}

const environmentsSchema = joi
  .object({
    PORT: joi.number().required(),
    AUTH_MICROSERVICE_PORT: joi.number().required(),
    AUTH_MICROSERVICE_HOST: joi.string().required(),
    AUTH_SERVICE: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_SERVICE: joi.string().required(),
    SALES_MICROSERVICE_PORT: joi.number().required(),
    SALES_MICROSERVICE_HOST: joi.string().required(),
    SALES_SERVICE: joi.string().required(),
    RETURNS_MICROSERVICE_PORT: joi.number().required(),
    RETURNS_MICROSERVICE_HOST: joi.string().required(),
    RETURNS_SERVICE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = environmentsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const environmentsVariables: EnvironmentsVariables = value;
export const environments = {
  serverPort: environmentsVariables.PORT,
  authMicroservicePort: environmentsVariables.AUTH_MICROSERVICE_PORT,
  authMicroserviceHost: environmentsVariables.AUTH_MICROSERVICE_HOST,
  authService: environmentsVariables.AUTH_SERVICE,
  productsMicroservicePort: environmentsVariables.PRODUCTS_MICROSERVICE_PORT,
  productsMicroserviceHost: environmentsVariables.PRODUCTS_MICROSERVICE_HOST,
  productsService: environmentsVariables.PRODUCTS_SERVICE,
  salesMicroservicePort: environmentsVariables.SALES_MICROSERVICE_PORT,
  salesMicroserviceHost: environmentsVariables.SALES_MICROSERVICE_HOST,
  salesService: environmentsVariables.SALES_SERVICE,
  returnsMicroservicePort: environmentsVariables.RETURNS_MICROSERVICE_PORT,
  returnsMicroserviceHost: environmentsVariables.RETURNS_MICROSERVICE_HOST,
  returnsService: environmentsVariables.RETURNS_SERVICE,
};
