import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  DATABASE_URL: string;
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().default(3000).optional(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    DATABASE_URL: joi.string().required().default('file:./dev.db'),
  })
  .unknown(true)
  .required();

const result = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});
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
  natsServers: envVars.NATS_SERVERS,
};
