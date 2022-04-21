import {Props} from "../../shared/global";
import {TimeProps} from "../../components/Time/interfaces";
import {MessagesProps} from "../../components/Messages/interfaces";

export interface ChatPageProps extends Props {
  chatName?: string
  time: TimeProps
  messages: MessagesProps
}
