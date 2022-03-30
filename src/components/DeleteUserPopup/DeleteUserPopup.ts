import {Block} from "../../shared/Block/Block";
import {ElementEvents} from "../../shared/global";
import {mapStateToProps} from "../../shared/store/mapStateToProps";
import {compile} from "../../shared/utils/compileTemplate";
import {DeleteUserPopupProps} from "./interfaces";

export class DeleteUserPopup extends Block<DeleteUserPopupProps> {
  constructor(props: DeleteUserPopupProps, event: string, events?: ElementEvents) {
    super('div', '.popup_type_delete-user', props, events);

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(templatePug, this.props, 'deleteUserPopup', this.meta.events)
  }
}