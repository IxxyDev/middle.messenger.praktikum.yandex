import {HandleForm} from "./form/form";
import {Validation} from "./form/validation";
import {InputName, Invalid} from "./form/interfaces";
import {INPUT_ERROR_TEXT} from "./form/errorText";
import store from "../shared/store/store";

export class HandleError {
  protected HandleForm: HandleForm

  constructor() {
    const validation = new Validation()
    this.HandleForm = new HandleForm(validation)
  }

  protected showError(path: string, event: string, error: Invalid, inputName: InputName) {
    const errorText = error?.text ? INPUT_ERROR_TEXT[inputName].text : INPUT_ERROR_TEXT[inputName].length

    const props = {
      addClass: ERROR_SHOWN,
      errorText
    }

    store.setState(path, props, event)
  }

  protected hideError(path: string, event: string, ) {
    const props = {
      addClass: '',
      errorText: ''
    }

    store.setState(path, props, event)
  }

  protected validateElements(event: Event, path: string, pageEvent: string): boolean {
    const validElements = this.HandleForm.validate(event)

    return validElements?.every(item => {
      if (!item) return true

      const errorPath = [path, item.dataName].reduce((acc, path) => `${acc}.${path}`)
      const errorEvent = [pageEvent, item.dataName].reduce((event, item) => `${event} ${item}`)

      if (item.invalid) {
        this.showError(errorPath, errorEvent, item.invalid, item.fieldName)
        return false
      }

      this.hideError(errorPath, errorEvent)
      return true
    })
  }
}
