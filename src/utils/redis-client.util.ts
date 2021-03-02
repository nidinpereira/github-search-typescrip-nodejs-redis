import redis from "redis";
import util from "util";
import {REDIS_PORT, REDIS_URL} from "../config/config";

export class RedisClient {
    protected readonly client: redis;

     constructor() {

        this.client = redis.createClient(REDIS_PORT, REDIS_URL);
        // to promisify the redis client
         this.client.get = util.promisify(this.client.get);
         this.client.flushall = util.promisify(this.client.flushall);

    }

    public readFromCache = async (key: string): Promise<JSON> => {
        try {
            const cachedData = await this.client.get(key);
            return JSON.parse(cachedData);
        } catch (err) {
            throw err;
        }
    };

    public saveInCache = (key: string, data: any) => {
        try {
            return this.client.set(key, JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    };

    public saveInCacheWithTimeOut = (key: string, timeoutInSeconds: number, data: any) => {
        try {
            return this.client.setex(key, timeoutInSeconds, JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    };

    public clearCache = async () => {
        try {
             return this.client.flushall();
        } catch (err) {
            throw err;
        }
    };


}
