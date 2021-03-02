import loggerUtil from "../utils/logger.util";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

if (fs.existsSync(path.resolve(__dirname, "./../../.env"))) {
    loggerUtil.debug("Using .env file to supply config environment variables");
    dotenv.config( { path: path.resolve(__dirname, "./../../.env") });
} else {
    loggerUtil.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: path.resolve(__dirname, "./../../.env.example") });  // you can delete this after you create your own .env file!
}
export const SERVER_IP = process.env.SERVER_IP;
export const SERVER_PORT = process.env.SERVER_PORT;
export const REDIS_PORT = process.env["REDIS_PORT"] ? parseInt(process.env["REDIS_PORT"]): 6379; // use default port if redis port isn't available in env;
export const REDIS_URL = process.env["REDIS_URL"] || "127.0.0.1"; // use localhost if redis url isn't available in env
