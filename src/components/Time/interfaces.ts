import {Props} from "../../shared/global";

export enum TimeType {
  Chat = 'chat',
  Message = 'message',
}

export interface TimeProps extends Props {
  type: TimeType,
  date: Date
}

export interface ParsedTimeProps extends Props {
  type: TimeType,
  date: string
}
