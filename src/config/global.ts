import { ConfigI } from "./cfg";

export default {

    keyDbPostgres: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASS,
        max: 2,
        min: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    }
}
 
export const CONFIG_PROD: ConfigI = {
    database: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        port: 5432,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASS,
        max: 2,
        min: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    }
 };

export const DESK_PORT = 49213;

export const secret = process.env.TOKEN_SECRET;
const env = process.env.NODE_ENV || "development";
export const config = CONFIG_PROD;
