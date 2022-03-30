export type ElementEvent = {
  id: string
  fn: (event: Event) => void
}

export type Indexed<T = unknown> = {
  [key in string]: T
}

export type Props = Indexed
export type ElementEvents = Record<string, ElementEvent[]>

