import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().default(3000).optional(),
    DATABASE_URL: joi.string().required().default('file:./dev.db'),
  })
  .unknown(true)
  .required();

const result = envVarsSchema.validate(process.env);
const { error, value } = result as {
  error?: joi.ValidationError;
  value: EnvVars;
};

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envVars: EnvVars = value;
export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
};
