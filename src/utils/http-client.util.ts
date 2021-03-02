import axios, {AxiosInstance, AxiosResponse} from "axios";

export class HttpClient {
    readonly instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleError = (error: any): Promise<any> => Promise.reject(error);
}
