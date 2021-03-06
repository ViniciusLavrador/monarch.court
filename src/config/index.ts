export * from '@nestjs/config';
export { default as loader } from './loader';
export { default as validationSchema } from './validation-schema';

export interface ConfigInterface {
  // Application
  NODE_ENV: string;
  PORT: number;

  // Database Management
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_BASE_URI: string;
  DB_URI: string;

  // Authentication
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;

  // Integrations
  GCM_API_KEY: string;
}
