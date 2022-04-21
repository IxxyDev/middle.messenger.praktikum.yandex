import {FieldName, FormValidation, Invalid, ValidItem} from "./interfaces";

export class HandleForm {
  private readonly formValidation: FormValidation

  constructor(formValidation: FormValidation) {
    this.formValidation = formValidation
  }

  // default serialization
  private serialize({elements}: HTMLFormElement): Element | null {
    return Array.from(elements)
      .filter((element: HTMLInputElement) => !!element.name)
      .reduce<Record<string, string>>((result, element: HTMLInputElement) => {
      const {key, value} = element
      result[key] = value

      return result
    }, {})
  }

  handleSubmit(event: Event): Element | null {
    event.preventDefault()
    return this.serialize(event.target as HTMLFormElement)
  }

  handleBlur(event: Event): Invalid {
    const input = event.target as HTMLInputElement
    const invalid = this.formValidation.validateInput(input)

    if (invalid) input.classList.add('invalid')
    return invalid
  }

  handleFocus(event: Event): void {
    const input = event.target as HTMLInputElement
    input.classList.remove('invalid')
  }

  validate(event: Event): ValidItem {
    const {elements} = event.target as HTMLFormElement

    return Array.from(elements)
      .filter((input: HTMLInputElement) => !!input.name)
      .map((input: HTMLInputElement) => {
        const hasValidation = this.formValidation.hasValidation(input)
        const invalid = this.formValidation.validateInput(input)
        const error = document.querySelector(`[error=${input.id}]`)
        const data = error.getAttribute('data')

        if (!hasValidation) return null
        if (invalid) input.classList.add('invalid')
        if (!error) throw new Error('No element with such id')
        if (!data) throw new Error('No data attr for input with such id')

        return {
          fieldName: input.name as FieldName,
          dataName: data,
          invalid: invalid
        }
      })
  }
}
