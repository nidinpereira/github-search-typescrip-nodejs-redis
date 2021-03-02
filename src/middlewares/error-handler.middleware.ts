import {Request, Response} from "express";
import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: (err: any) => any): void {
        response
            .status(error.httpCode)
            .json({
                message: error.message,
                errors: error.errors
            });
        next(error);
    }
}
