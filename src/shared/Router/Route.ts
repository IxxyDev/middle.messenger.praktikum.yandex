import { BlockInstance, RouteProps } from "./types";
import { Block } from "../Block/Block";
import { ElementEvents, Props } from "../global";

type ElementView = new (propsObj: Props | undefined, events: ElementEvents | undefined, rootId?: string) => InstanceType<typeof Block>

export class Route {
	private readonly pathname: string;
	private readonly elementView: ElementView;
	private block: BlockInstance | undefined | null;
	private readonly props: RouteProps;

	constructor(pathname: string, elementView: ElementView, props: RouteProps) {
		this.block = null;
		this.props = props;
		this.elementView = elementView;
		this.pathname = pathname;
	}

	match(pathname: string) {
		return pathname === this.pathname;
	}

	navigate(pathname: string) {
		this.match(pathname) && this.render();
	}

	leave() {
		this.block && this.block.destroy();
	}

	render() {
		console.log(this.elementView);
		this.block = new this.elementView(undefined, undefined, this.props.query);
	}
}
