enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type Options = {
    headers?: Record<string, string>;
    method?: METHODS;
    timeout?: number;
    data?: unknown;
};

function queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object') {
        throw new Error('Должен быть объектом');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get = (url: string, options: Omit<Options, 'method'> = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };
    post = (url: string, options: Omit<Options, 'method'> = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    put = (url: string, options: Omit<Options, 'method'> = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    delete = (url: string, options: Omit<Options, 'method'> = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request<T = unknown> (url: string, options: Options, timeout = 5000): Promise<T> {
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
                    ? `${url}${queryStringify(data as Record<string, unknown>)}`
                    : url,
            );
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
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
