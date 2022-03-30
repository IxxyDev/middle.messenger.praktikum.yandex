import {Block} from "../../shared/Block/Block";
import {ElementEvents} from "../../shared/global";
import {mapStateToProps} from "../../shared/store/mapStateToProps";
import {compile} from "../../shared/utils/compileTemplate";
import {AddUserPopupProps} from "./interfaces";

export class AddUserPopup extends Block<AddUserPopupProps> {
  constructor(props: AddUserPopupProps, event: string, events?: ElementEvents) {
    super('div', '.popup_type_add-user', props, events);

    this.subscribe(event, mapStateToProps)
  }

  render() {
    return compile(templatePug, this.props, 'addUserPopup', this.meta.events)
  }
}