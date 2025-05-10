enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

enum HTTP_STATUS {
    OK = 200,
    REDIRECTION = 300,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
}

type HTTPMethod = <R = unknown>(url: string, options?: Partial<Omit<Options<R>, 'method'>>) => Promise<R>;

type Options<Q> = {
    headers?: Record<string, string>;
    method?: METHODS;
    timeout?: number;
    data?: Q;
};

function queryStringify(data: Record<string, string | number | boolean>): string {
    if (typeof data !== 'object') {
        throw new Error('Должен быть объектом');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${encodeURIComponent(result)}${encodeURIComponent(key)}=${
            encodeURIComponent(data[key] ? data[key] : '')}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    private createMethod(method: METHODS): HTTPMethod {
        return (url, options = {}) => this.request(url, { ...options, method });
    }

    get = this.createMethod(METHODS.GET);

    post = this.createMethod(METHODS.POST);

    put = this.createMethod(METHODS.PUT);

    delete =this.createMethod(METHODS.DELETE);

    private request<T>(url: string, options: Options<T>, timeout = 5000): Promise<T> {
        const {headers = {}, method, data} = options;
        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('Нет метода');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;
            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data as Record<string, string | number | boolean>)}`
                    : url,
            );
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = () => {
                if (xhr.status >= HTTP_STATUS.OK && xhr.status < HTTP_STATUS.REDIRECTION) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
