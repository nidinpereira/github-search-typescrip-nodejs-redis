import {Express} from "express";
import "reflect-metadata";
import {useExpressServer} from "routing-controllers";
import {GithubSearchController} from "./modules/search/search.controller";
import {ErrorHandlerMiddleware} from "./middlewares/error-handler.middleware";
import {CachingMiddleware} from "./middlewares/caching.middleware";
import {ServerMaintenanceController} from "./modules/server-maintenance/server-maintenance.controller";

function setRoutes(app: Express): Express  {
    return useExpressServer(app, {
        routePrefix: "/api",
        controllers: [GithubSearchController, ServerMaintenanceController],
        validation: true,
        classTransformer: true,
        defaultErrorHandler: false,
        middlewares: [CachingMiddleware, ErrorHandlerMiddleware],
    });
}

export default setRoutes;
