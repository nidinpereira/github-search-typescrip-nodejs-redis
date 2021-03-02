import {HttpClient} from "../../utils/http-client.util";
import GithubUser from "../../models/github-user.model";
import {AxiosResponse} from "axios";
import {GithubResponse} from "../../models/github-response.interface";
import GithubRepo from "../../models/github-repo.model";
import GithubIssue from "../../models/github-issues.model";

export class SearchService {
    httpClient: HttpClient;
    constructor() {
        this.httpClient = new HttpClient("https://api.github.com/search/");
    }

    public getUsers = (query: string): Promise<AxiosResponse<GithubResponse<GithubUser[]>>> => {
        return this.httpClient.instance.get<GithubResponse<GithubUser[]>>(`users?q=${query}`);
    }

    public getRepos = (query: string): Promise<AxiosResponse<GithubResponse<GithubRepo[]>>> => {
        return this.httpClient.instance.get<GithubResponse<GithubRepo[]>>(`repositories?q=${query}`);
    }

    public getIssues = (query: string): Promise<AxiosResponse<GithubResponse<GithubIssue[]>>> => {
        return this.httpClient.instance.get<GithubResponse<GithubIssue[]>>(`issues?q=${query}`);
    }

}
