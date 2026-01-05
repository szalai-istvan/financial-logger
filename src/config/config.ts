import dotenv from "dotenv";
import path from "path";

function loadEnvironment() {
    const envFile = '.env.dev';
    dotenv.config({ path: path.resolve(process.cwd(), envFile) });
}

export const Config = {
    loadEnvironment: loadEnvironment
};