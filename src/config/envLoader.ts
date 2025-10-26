import dotenv from "dotenv";
import path from "path";

export function loadEnvironment() {
    const envFile = '.env.dev';
    dotenv.config({ path: path.resolve(process.cwd(), envFile) });
}