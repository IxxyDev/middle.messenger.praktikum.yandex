import {FieldName, FormValidation, Invalid} from "./interfaces";

export class Validation implements FormValidation {
  hasValidation(fieldName: string): fieldName is FieldName {
    return Object.values<string>(FieldName).includes(fieldName)
  }

  validateInput(input: HTMLInputElement): Invalid {
    const {name, value} = input
    if (!name) throw new Error('No name attr for this input')

    switch (name) {
      case FieldName.firstName || FieldName.lastName:
        const isValidName = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(value);
        if (!isValidName) return { text: true }

        return null
      case FieldName.login:
        const isValidText = /^([0-9]*[a-zA-Z\-_][0-9]*)+$/.test(value);
        const isValidLength = value.length >= 2 && value.length < 15;
        if (!isValidText || !isValidLength) return { text: true }

        return null
      case FieldName.email:
        const isValidEmail = /^([\w-.]+@[a-zA-Z]+.[a-z]+)$/.test(value);
        if (!isValidEmail) return { text: true }

        return null
      case FieldName.password:
        const isValidPassword = /^(.*([A-Z]+.*[0-9]+|[0-9]+.*[A-Z]+).*)+$/.test(value);
        const isValidPasswordLength = value.length >= 6 && value.length < 20;
        if (!isValidPassword || !isValidPasswordLength) return { text: true }

        return null
      case FieldName.message:
        const isValidMessage = value.length > 0
        if (!isValidMessage) return null;
    }
    throw new Error(`No such name as ${name}`);
  }
}
