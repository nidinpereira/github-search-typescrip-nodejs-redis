"use strict";
import {
    Body, Controller,
    Get,
    Post,
    QueryParam
} from "routing-controllers";
import {SearchService} from "./search.service";
import {RedisClient} from "../../utils/redis-client.util";
import {GithubSearchDto, GithubSearchTypes} from "./dto/github-search.dto";

@Controller()
export class GithubSearchController{
    private apiService: SearchService;
    private redisClient: RedisClient;

    constructor() {
        this.apiService = new SearchService();
        this.redisClient = new RedisClient();
    }

    @Post("/search", )
    async search(@Body() body: GithubSearchDto): Promise<any> {
        const cacheKey = `type=${body.type}--searchString=${body.searchText}`;

        const cachedResult = await this.redisClient.readFromCache(cacheKey);

        if (cachedResult) {
            return cachedResult;
        } else {
            let networkResult;
            switch (body.type) {
                case GithubSearchTypes.Repo:
                    networkResult = await this.apiService.getRepos(body.searchText);
                    break;
                case GithubSearchTypes.Issue:
                    networkResult = await this.apiService.getIssues(body.searchText);
                    break;
                default:
                    // return users if no type is provided
                    networkResult = await this.apiService.getUsers(body.searchText);
                    break;
            }

            this.redisClient.saveInCache(cacheKey, networkResult);
            return networkResult;
        }
    }


    @Get("/search/users")
    async getAllUsers(
        @QueryParam("q", {required: true}) q: string,
    ) {
        return this.apiService.getUsers(q);
    }

    @Get("/search/repositories")
    async getAllRepos(
        @QueryParam("q", {required: true}) q: string,
    ) {
        return this.apiService.getRepos(q);
    }

    @Get("/search/issues")
    async getAllIssues(
        @QueryParam("q", {required: true}) q: string,
    ) {
        return this.apiService.getIssues(q);
    }
}
