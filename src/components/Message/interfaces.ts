import {Props} from "../../shared/global";
import {AvatarProps} from "../Avatar/interfaces";

export interface MessageProps extends Props {
  you: boolean
  text: string
  avatar: AvatarProps
  time: TimeProps
}
