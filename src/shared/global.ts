import {Page404Props} from "../pages/404/interfaces";
import {Page500Props} from "../pages/500/interfaces";

export type ElementEvent = {
  id: string
  fn: (event: Event) => void
}

export type Indexed<T = unknown> = {
  [key in string]: T
}

export type Props = Indexed
export type ElementEvents = Record<string, ElementEvent[]>

export type State = {
  page404: Page404Props,
  page500: Page500Props
}

