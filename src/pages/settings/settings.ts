import { ElementEvents } from "../../shared/global";
import { Block } from "../../shared/Block/Block";
import { mapStateToProps } from "../../shared/store/mapStateToProps";
import { compile } from "../../shared/utils/compileTemplate";

export class SettingsPage extends Block<SettingsPageProps> {
  constructor(props: SettingsPageProps = settingsPageState, events: ElementEvents, rootId?: string ) {
    super('main', 'settingsPage', props, events, rootId);

    this.subscribe(SETTINGS_EVENT, mapStateToProps)
    this.subscribe(UPDATE_USER_EVENT, mapStateToProps)
    UserInfoController.getUserInfo()
  }

  componentDidMount() {
    const root = document.getElementById(this.meta.rootId || 'root')
    root?.appendChild(this.getContent())
  }

  render() {
    return compile(template, this.props, SETTINGS_EVENT, this.meta.events)
  }
}
