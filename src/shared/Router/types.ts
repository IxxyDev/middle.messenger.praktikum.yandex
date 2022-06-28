import { Block } from "../Block/Block";

export type RouteProps = {
  query: string;
};

export type BlockInstance = InstanceType<typeof Block>;
