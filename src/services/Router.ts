import {Route} from "./Route";
import {ComponentProps} from "./Component";
import Store from "./Store";
import {BlockClass} from "../type/Types";

class Router {
    private static __instance: Router;
    private readonly _rootQuery!: string;
    routes: Route[] = [];
    _currentRoute: Route | null = null;
    history: History = window.history;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    public static getInstance(): Router {
        if (!Router.__instance) {
            Router.__instance = new Router('#app');
        }
        return Router.__instance;
    }

    use(pathname: string, titlePage: string, block: BlockClass, tagName: string,  props?: ComponentProps): Router {
        this.routes.push(new Route(pathname, titlePage, this._rootQuery, block, tagName, props ? props : {}));
        return this;
    }

    start() {
        window.addEventListener('popstate', () => {
            this._onRouteChange();
        });
        this._onRouteChange();
    }

    _onRouteChange() {
        const pathname = window.location.pathname;
        let route = this.getRoute(pathname);
        if (!route) {
            window.history.replaceState({}, '', '/404');
            route = this.getRoute('/404');
        }
        route = this.checkRoute(route!);
        this._currentRoute?.leave();
        this._currentRoute = route;
        route.render();
    }

    getRoute(pathname: string): Route | null {
        const route = this.routes.find(route => route.match(pathname));
        return route || null;
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRouteChange();
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    checkRoute(route: Route): Route {
        if (Store.isAuthenticate() && route._pathname === '/') { // если пользователь авторизован и пытается зайти на страницу логина, то выкидываем его на список чатов
            window.history.replaceState({}, '', '/messenger');
            return this.getRoute('/messenger') ?? route;
        } else if (!Store.isAuthenticate() && (route._pathname !== '/sign-up' && route._pathname !== '/' && route._pathname !== '/404' && route._pathname !== '/500')) { // если пользователь не авторизован он может попасть только на страницы ошибок, логина и регистрации
            window.history.replaceState({}, '', '/');
            return this.getRoute('/') ?? route;
        } //и остаются остальные разрешённые случаи навигации
        return route;
    }
}

export default Router.getInstance();
