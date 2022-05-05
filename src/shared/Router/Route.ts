import {Block} from '../Block/Block';
import {BlockHeir, RouteProps} from './types';

export class Route {
	private readonly pathname: string;
	private readonly elementView: BlockHeir;
	private block: InstanceType<typeof Block> | undefined;
	private readonly props: RouteProps;

	constructor(pathname: string, elementView: BlockHeir, props: RouteProps) {
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
		this.block = new this.elementView(undefined, undefined, this.props.query);
	}
}
