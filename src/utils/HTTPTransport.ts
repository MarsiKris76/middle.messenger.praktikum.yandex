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

type HTTPMethod = <R>(url: string, options?: Partial<Omit<Options, 'method'>>) => Promise<R>;

type Options<Q = unknown> = {
    headers?: Record<string, string>;
    method?: METHODS;
    timeout?: number;
    data?: Q | FormData;
};

function queryStringify(data: Record<string, string | number | boolean>): string {
    if (typeof data !== 'object') {
        throw new Error('Данные должны быть объектом');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${encodeURIComponent(result)}${encodeURIComponent(key)}=${encodeURIComponent(
            data[key] ?? ''
        )}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export default class HTTPTransport {
    protected _prefix: string;

    constructor(prefix: string = '') {
        this._prefix = 'https://ya-praktikum.tech/api/v2' + prefix;
    }

    private createMethod(method: METHODS): HTTPMethod {
        return <R, Q = void>(url: string, options: Omit<Options<Q>, 'method'> = {}) => {
            return this.request<R>(url, { ...options, method });
        };
    }

    get = this.createMethod(METHODS.GET);

    post = this.createMethod(METHODS.POST);

    put = this.createMethod(METHODS.PUT);

    delete = this.createMethod(METHODS.DELETE);

    private request<R>(url: string, options: Options, timeout = 5000): Promise<R> {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('Метод не указан');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;
            let fullUrl = `${this._prefix}${url}`;
            if (isGet && data && typeof data === 'object') {
                try {
                    // Типизируем data как QueryParams
                    fullUrl += queryStringify(data as Record<string, string | number | boolean>);
                } catch (e) {
                    reject('Не удалось сериализовать параметры: ' + e);
                    return;
                }
            }
            xhr.open(method, fullUrl);
            xhr.withCredentials = true;
            if (headers && !(data instanceof FormData)) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }
            // Настройка ответа
            xhr.onload = () => {
                let parsedResponse: R | undefined;
                try {
                    parsedResponse = JSON.parse(xhr.response);
                } catch {
                    parsedResponse = xhr.response as R;
                }
                if (xhr.status >= HTTP_STATUS.OK && xhr.status < HTTP_STATUS.REDIRECTION) {
                    if (parsedResponse) resolve(parsedResponse);
                } else {
                    reject({
                        status: xhr.status,
                        message: xhr.statusText,
                        response: parsedResponse
                    });
                }
            };
            xhr.onabort = () => reject({ reason: 'request_aborted' });
            xhr.onerror = () => reject({ reason: 'network_error' });
            xhr.ontimeout = () => reject({ reason: 'timeout' });
            xhr.timeout = timeout;
            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else if (typeof data === 'object') {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send(data as string | Blob | ArrayBufferView);
            }
        });
    }
}
