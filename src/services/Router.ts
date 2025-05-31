import {Route, BlockClass} from "./Route";
import {ComponentProps} from "./Component";

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
        const route = this.getRoute(pathname);
        if (route) {
            this._currentRoute?.leave();
            this._currentRoute = route;
            route.render();
        } else {
            this.go('/404');
        }
    }

    getRoute(pathname: string): Route | null {
        const route = this.routes.find(route => route._pathname === pathname);
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
}

export default Router.getInstance();
