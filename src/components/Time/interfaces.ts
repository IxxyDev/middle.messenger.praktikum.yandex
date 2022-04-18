import {Props} from "../../shared/global";

export enum TimeType {
  Main = 'mainTime',
  Card = 'cardTime',
}

export interface TimeProps extends Props {
  type: TimeType,
  date: Date
}

export interface ParsedTimeProps extends Props {
  time: TimeType,
  date: string
}
