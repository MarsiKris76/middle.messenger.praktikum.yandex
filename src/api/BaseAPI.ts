import HTTPTransport from "../utils/HTTPTransport";

export abstract class BaseAPI {
    protected http: HTTPTransport;

    constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }

    protected abstract create<R, Q>(data: Q): Promise<R>;

    protected abstract request<Q, R>(data: Q): Promise<R>;

    protected abstract update<Q, R>(data: Q): Promise<R>;

    protected abstract delete<Q, R>(data: Q): Promise<R>;
}
