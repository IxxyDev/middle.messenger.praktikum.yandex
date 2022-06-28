import { Route } from "./Route";
import { BlockInstance } from "./types";

export class Router {
  private static instance: Router;
  private readonly query: string;
  private readonly currentRoute: Route | null;
  private readonly routes: Route[];
  private fallBackPathname: string;
  private readonly history: History;

  constructor(query: string) {
    if (Router.instance) return Router.instance;
    Router.instance = this;

    this.routes = [];
    this.history = window.history;
    this.query = query;
    this.currentRoute = null;
    this.fallBackPathname = "";
  }

  use(pathname: string, block: BlockInstance) {
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

    this.currentRoute?.leave();
    route.render();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  fallback(pathname: string, block: BlockInstance) {
    this.use(pathname, block);
    this.fallBackPathname = pathname;
    return this;
  }
}
