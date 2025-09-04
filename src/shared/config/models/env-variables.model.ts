import Environment from '@/shared/config/models/environment.enum';
import { z } from 'zod';

export const ENV_VARIABLES_SCHEMA = z.object({
  NODE_ENV: z
    .enum(Object.values(Environment) as [Environment, ...Environment[]])
    .default(Environment.LOCAL),
  PORT: z
    .string()
    .regex(/\d{4,5}/)
    .default('5000'),
  DATABASE_HOST: z.string().nonempty(),
  DATABASE_NAME: z.string().nonempty(),
  DATABASE_USERNAME: z.string().nonempty(),
  DATABASE_PASSWORD: z.string().nonempty(),
  DATABASE_PORT: z
    .string()
    .regex(/\d{4,5}/)
    .nonempty(),
  ALLOWED_USER_SECRET_KEY: z.string().nonempty(),
  BACKEND_DOMAIN: z.string().nonempty(),
  FRONTEND_DOMAIN: z.string().nonempty(),
});

export type EnvVariables = z.infer<typeof ENV_VARIABLES_SCHEMA>;
