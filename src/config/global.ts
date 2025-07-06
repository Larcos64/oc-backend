import { ConfigI } from "./cfg";

export default {

    keyDbPostgres: {
        host: "localhost",
        user: "postgres",
        port: 5432,
        database: "organizational_climate",
        password: "Larcos665",
        max: 2,
        min: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    }
}
 
export const CONFIG_PROD: ConfigI = {
    database: {
        host: "",
        user: "postgres",
        port: 5432,
        database: "organizational_climate",
        password: "Larcos665",
        max: 2,
        min: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    }
 };

export const DESK_PORT = 49213;

export const secret = "U4NPR0J3C7";
const env = process.env.NODE_ENV || "development";
export const config = CONFIG_PROD;
