import HTTPTransport from "../utils/HTTPTransport";

export class BaseAPI {
    protected http: HTTPTransport;

    constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }

}
