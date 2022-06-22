import { ConfigInterface } from '.';

export default (): ConfigInterface => ({
  // Application
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10),

  // Database Management
  DB_BASE_URI: process.env.DB_BASE_URI,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_URI: process.env.DB_URI,
  DB_USER: process.env.DB_USER,

  // Authentication
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,

  // Integrations
  GCM_API_KEY: process.env.GCM_API_KEY,
});
