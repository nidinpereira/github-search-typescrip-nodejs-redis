"use strict";
import {
    Controller,
    Post,
} from "routing-controllers";
import {RedisClient} from "../../utils/redis-client.util";

@Controller()
export class ServerMaintenanceController {
    private redisClient: RedisClient;

    constructor() {
        this.redisClient = new RedisClient();
    }

    @Post("/clear-cache", )
    async clearCache(): Promise<any> {
        try {
            await this.redisClient.clearCache();
            return {"status": "success"};
        } catch (e) {
            return `Oops something went wrong: ${e}`;
        }
    }
    
}
