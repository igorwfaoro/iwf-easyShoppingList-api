export const ENV_CONFIG: {
    ENV: 'dev'|'prod',
    
    HOST: string;
    PORT: number;

    PUBLIC_ADDRESS: string;

    JWT_SECRET: string;

    JSON_DB_FILE_PATH: string;

} = process.env as any;