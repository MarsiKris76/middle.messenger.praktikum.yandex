import Router from './Router';
import { Route } from './Route';
import { BlockClass } from '../type/Types';

jest.mock('./Route');

const MockComponent: BlockClass = jest.fn().mockImplementation(() => {
    return {
        getContent: jest.fn().mockReturnValue(document.createElement('div')),
        dispatchComponentDidMount: jest.fn()
    };
});

interface PartialRoute extends Partial<Route> {
    match?: (pathname: string) => boolean;
    _pathname?: string;
}

describe('Router', () => {
    let router: typeof Router;

    beforeEach(() => {
        const RouterClass = Object.getPrototypeOf(Router).constructor;
        RouterClass.__instance = null;
        router = new RouterClass('#app');
        document.body.innerHTML = '<div id="app"></div>';
    });

    describe('Constructor', () => {
        test('роутер создаётся', () => {
            expect(router).toBeDefined();
        });
        test('роутер правильно инициализирует корневой селектор', () => {
            expect(router['_rootQuery']).toBe('#app');
        });
    });

    describe('Route Registration', () => {
        test('роутер должен добавлять новые маршруты', () => {
            router.use('/test', 'Test Page', MockComponent, 'div', { test: 'prop' });
            expect(Route).toHaveBeenCalledWith('/test', 'Test Page', '#app', MockComponent, 'div', { test: 'prop' });
        });
        test('роутер должен возвращать экземпляр маршрутизатора', () => {
            const result = router.use('/test', 'Test Page', MockComponent, 'div');
            expect(result).toBe(router);
        });
    });

    describe('Поиск Route', () => {
        test('роутер возвращает найденный маршрут', () => {
            const mockRoute: PartialRoute = {
                match: jest.fn().mockReturnValue(true),
                _pathname: '/'
            };
            router.routes = [mockRoute as Route];
            const result = router.getRoute('/some-path');
            expect(result).toBe(mockRoute as Route);
            expect(mockRoute.match).toHaveBeenCalledWith('/some-path');
        });
        test('роутер возвращает null если маршрут не найден', () => {
            const mockRoute: PartialRoute = {
                match: jest.fn().mockReturnValue(false)
            };
            router.routes = [mockRoute as Route];
            const result = router.getRoute('/non-existent');
            expect(result).toBeNull();
        });
    });

    describe('Навигация', () => {
        test('роутер вызывает функцию back', () => {
            const backSpy = jest.spyOn(window.history, 'back');
            router.back();
            expect(backSpy).toHaveBeenCalled();
        });
        test('роутер вызывает функцию forward', () => {
            const forwardSpy = jest.spyOn(window.history, 'forward');
            router.forward();
            expect(forwardSpy).toHaveBeenCalled();
        });
    });
});
