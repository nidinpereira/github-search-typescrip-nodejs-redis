import {IsEnum, IsString} from "class-validator";

export enum GithubSearchTypes {
    User = "user",
    Repo = "repo",
    Issue = "issue"
}

export class GithubSearchDto {

    @IsEnum(GithubSearchTypes,{
    message: "type should be an enum with values (user, repo, issue)"
})
    type: GithubSearchTypes;

    @IsString()
    searchText: string;

}
