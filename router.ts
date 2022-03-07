import Block from "./src/components/Block";

class Route {
  private pathname: string;
  private blockClass: any;
  private block: any;
  private props: any;

  constructor(pathname: string, view: any, props: any) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.getContent().remove();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass();
    }

    const root = document.querySelector(this.props.rootQuery);

    if (!root) {
      throw new Error('Root not found');
    }

    root.innerHTML = '';
    root.appendChild(this.block.getContent());
  }
}

export class Router {
  static instance: Router;

  routes: Route[];
  history = window.history;
  currentRoute: Route | null;
  rootQuery: string;

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;
    this.routes = []
  }

  public use(pathname: string, block: typeof Block): Router {
    const route = new Route(pathname, block, {rootQuery: '#app'});
    this.routes.push(route);
    // Возврат this — основа паттерна "Builder" («Строитель»)
    return this;
  }

  public start(): void {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = () => {
      this.onRoute(window.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    const route: any = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render(route, pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }

  private getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}
