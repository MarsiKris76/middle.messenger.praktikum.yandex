import HTTPTransport, { METHODS } from './HTTPTransport'; // Укажите правильный путь
jest.mock('../services/Router');
jest.mock('../services/Store');

const createMockXHR = () => ({
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    onload: jest.fn(),
    onerror: jest.fn(),
    ontimeout: jest.fn(),
    status: 200,
    withCredentials: false,
    timeout: 5000
});

describe('HTTPTransport', () => {
    let http: HTTPTransport;
    let mockXHR: ReturnType<typeof createMockXHR>;

    beforeEach(() => {
        jest.clearAllMocks();
        http = new HTTPTransport('/test');
        mockXHR = createMockXHR();
        (global.XMLHttpRequest as unknown as jest.Mock) = jest.fn(() => mockXHR);
        mockXHR.status = 200;
    });

    describe('GET', () => {
        test('запрос должен быть сформирован с методом GET и правильным URL', async () => {
            http.get('/users');
            mockXHR.onload();
            expect(mockXHR.open).toHaveBeenCalledWith(
                METHODS.GET,
                'https://ya-praktikum.tech/api/v2/test/users'
            );
        });
        test('запрос должен быть сформирован с пустым телом запроса', async () => {
            http.get('/users');
            mockXHR.onload();
            expect(mockXHR.send).toHaveBeenCalledWith();
        });
        test('запрос должен быть сформирован с флагом withCredentials = true', async () => {
            http.get('/users');
            mockXHR.onload();
            expect(mockXHR.withCredentials).toBe(true);
        });
        test('запрос должен быть сформирован с параметрами в URL запроса', async () => {
            http.get('/users', { data: { id: 1, name: 'Max' } });
            mockXHR.onload();
            expect(mockXHR.open).toHaveBeenCalledWith(
                METHODS.GET,
                'https://ya-praktikum.tech/api/v2/test/users%253Fid%3D1%26name=Max'
            );
        });
        test('запрос не должен быть сформирован с телом запроса если передаются параметры', async () => {
            http.get('/users', { data: { id: 1, name: 'Max' } });
            mockXHR.onload();
            expect(mockXHR.send).toHaveBeenCalledWith();
        });
    });

    describe('POST', () => {
        test('запрос должен быть сформирован с методом POST и правильным URL', async () => {
            http.post('/users');
            mockXHR.onload();
            expect(mockXHR.open).toHaveBeenCalledWith(
                METHODS.POST,
                'https://ya-praktikum.tech/api/v2/test/users'
            );
        });
        test('запрос должен быть сформирован переданным телом запроса', async () => {
            const data = { id: 17, name: 'Mona' };
            http.post('/users', { data });
            mockXHR.onload();
            expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
        });
        test('запрос должен быть сформирован с флагом withCredentials = true', async () => {
            const data = { id: 17, name: 'Mona' };
            http.post('/users', { data });
            mockXHR.onload();
            expect(mockXHR.withCredentials).toBe(true);
        });
        test('запрос должен быть сформирован с переданным заголовком', async () => {
            http.post('/users', {
                headers: { 'Content-Type': 'application/json' }
            });
            mockXHR.onload();
            expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
                'Content-Type','application/json'
            );
        });
    });

    describe('PUT', () => {
        test('запрос должен быть сформирован с методом PUT и правильным URL', async () => {
            const data = { id: 1, name: 'John Wick' };
            http.put('/users/1', { data });
            mockXHR.onload();
            expect(mockXHR.open).toHaveBeenCalledWith(
                METHODS.PUT,
                'https://ya-praktikum.tech/api/v2/test/users/1'
            );
        });
        test('запрос должен быть сформирован с переданным телом запроса', async () => {
            const data = { id: 1, name: 'John Wick' };
            http.put('/users/1', { data });
            mockXHR.onload();
            expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
        });
        test('запрос должен быть сформирован с переданным заголовком', async () => {
            http.put('/users/1', {
                headers: { 'Content-Type': 'application/json' }
            });
            mockXHR.onload();
            expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
                'Content-Type','application/json'
            );
        });
    });

    describe('DELETE', () => {
        test('запрос должен быть сформирован с методом PUT и правильным DELETE', async () => {
            http.delete('/users/1');
            mockXHR.onload();
            expect(mockXHR.open).toHaveBeenCalledWith(
                METHODS.DELETE,
                'https://ya-praktikum.tech/api/v2/test/users/1'
            );
        });
        test('запрос должен быть сформирован с пустым телом запроса', async () => {
            http.delete('/users/1');
            mockXHR.onload();
            expect(mockXHR.send).toHaveBeenCalledWith();
        });
    });
});
