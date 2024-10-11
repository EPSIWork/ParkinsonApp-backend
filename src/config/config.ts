import 'dotenv/config';

interface ProcessEnv {
    NODE_ENV: string;
    MAIL_FROM: string;
    MAIL_HOST: string;
    // MAIL_PORT: number;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    JWT_EXPIRATION_TIME: string;
    JWT_SECRET: string;
    PORT?: string | number;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    FRONT_URL: string;
    CONFIRM_EMAIL_URL: string;
    RESET_PASSWORD_URL: string;
}

export const config: ProcessEnv = {
    NODE_ENV: process.env.NODE_ENV ?? 'dev',
    MAIL_FROM: process.env.MAIL_FROM ?? '',
    MAIL_HOST: process.env.MAIL_HOST ?? '',
    MAIL_USER: process.env.MAIL_USER ?? '',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD ?? '',
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME ?? '',
    JWT_SECRET: process.env.JWT_SECRET ?? '',
    PORT: Number(process.env.PORT) || 3000,
    DB_HOST: process.env.DB_HOST ?? '',
    DB_PORT: process.env.DB_PORT ?? '',
    DB_NAME: process.env.DB_NAME ?? '',
    DB_USER: process.env.DB_USER ?? '',
    DB_PASSWORD: process.env.DB_PASSWORD ?? '',
    FRONT_URL: process.env.FRONT_URL ?? '',
    CONFIRM_EMAIL_URL: process.env.CONFIRM_EMAIL_URL ?? '',
    RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL ?? '',
};
