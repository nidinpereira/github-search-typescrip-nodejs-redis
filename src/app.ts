import express, {Express} from "express";
import compression from "compression";  // compresses requests
import cors from "cors";
import helmet from "helmet";

// route handler
import setRoutes from "./app.router";
import bodyParser from "body-parser";
import {SERVER_IP, SERVER_PORT} from "./config/config";

// Create Express server
const app: Express = express();

// Express configuration
app.set("port", SERVER_PORT || 3000);
app.set("serverIp", SERVER_IP || "127.0.0.1");

app.use(bodyParser.json());
app.use(compression());

app.disable("x-powered-by");

// CORS
app.use(cors());

app.disable("etag");
// Compression
app.use(compression());
app.use(helmet());

/**
 * load API routes dynamically.
 */
setRoutes(app);




export default app;
