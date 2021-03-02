import GithubUser from "./github-user.model";

export default interface GithubIssue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: 7;
    title: string;
    user: GithubUser;
    labels: any[];
    state: string;
    locked: false;
    assignee?: any;
    assignees: any[];
    milestone: null;
    comments: 0;
    created_at: string;
    updated_at: string;
    closed_at?: string;
    author_association: string;
    active_lock_reason: null;
    body: string;
    performed_via_github_app?: any;
    score: number
}
