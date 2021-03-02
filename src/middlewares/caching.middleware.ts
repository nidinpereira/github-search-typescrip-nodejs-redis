import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";
import {RedisClient} from "../utils/redis-client.util";

@Middleware({ type: "before" })
export class CachingMiddleware implements ExpressMiddlewareInterface {
    private redisClient: RedisClient;

    async use(request: any, response: any, next: (err?: any) => any): Promise<any> {
        if (request.method === "GET" && request.headers["cache-control"] !== "no-cache") {
            this.redisClient = new RedisClient();
            const url = request.originalUrl || request.url;
            const uid = request.user ? request.user.uid : "no-auth";
            const cacheKey = `url__${uid}__${url}`;
            const cacheContent: any = await this.redisClient.readFromCache(cacheKey);

            if (cacheContent) {
                return response.json(cacheContent);
            } else {
                response.sendResponse = response.json;
                response.json = (body) => {
                    this.redisClient.saveInCacheWithTimeOut(cacheKey, 30, body);
                    response.sendResponse(body);
                };
            }
        }
        next();
    }
}
