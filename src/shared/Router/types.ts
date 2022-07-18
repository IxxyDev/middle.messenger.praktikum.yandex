import { Block } from '../Block/Block';
import { ElementEvents, Props } from '../global';

export type RouteProps = {
  query: string;
};

export type BlockInstance = InstanceType<typeof Block>;
export type Inheritor = new (
  propsObj: Props | undefined,
  events: ElementEvents | undefined,
  rootId?: string,
) => InstanceType<typeof Block>;
