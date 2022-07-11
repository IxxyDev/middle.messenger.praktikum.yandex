import { Route } from './Route';
import { Inheritor } from './types';

export class Router {
  private static instance: Router;
  private readonly query: string;
  private currentRoute: Route | null;
  private readonly routes: Route[];
  private fallBackPathname: string;
  private readonly history: History;

  constructor(query: string) {
    if (Router.instance) return Router.instance;

    this.routes = [];
    this.history = window.history;
    this.query = query;
    this.currentRoute = null;
    // this.fallBackPathname = "";
    Router.instance = this;
  }

  use(pathname: string, block: Inheritor) {
    const route = new Route(pathname, block, { query: this.query });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = event => {
      this.onRoute((event.currentTarget as Window)?.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname) || this.getRoute(this.fallBackPathname);

    if (!route) return;

    if (this.currentRoute) this.currentRoute.leave();

    this.currentRoute = route;
    route.render();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  fallback(pathname: string, block: Inheritor) {
    this.use(pathname, block);
    this.fallBackPathname = pathname;
    return this;
  }
}
