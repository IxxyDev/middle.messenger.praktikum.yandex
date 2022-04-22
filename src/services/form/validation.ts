import {InputName, FormValidation, Invalid} from "./interfaces";

export class Validation implements FormValidation {
  hasValidation(InputName: string): InputName is InputName {
    return Object.values<string>(InputName).includes(InputName)
  }

  validateInput(input: HTMLInputElement): Invalid {
    const {name, value} = input
    if (!name) throw new Error('No name attr for this input')

    switch (name) {
      case InputName.firstName || InputName.lastName:
        const isValidName = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(value);
        if (!isValidName) return { text: true }

        return null
      case InputName.login:
        const isValidText = /^([0-9]*[a-zA-Z\-_][0-9]*)+$/.test(value);
        const isValidLength = value.length >= 2 && value.length < 15;
        if (!isValidText || !isValidLength) return { text: true }

        return null
      case InputName.email:
        const isValidEmail = /^([\w-.]+@[a-zA-Z]+.[a-z]+)$/.test(value);
        if (!isValidEmail) return { text: true }

        return null
      case InputName.password:
        const isValidPassword = /^(.*([A-Z]+.*[0-9]+|[0-9]+.*[A-Z]+).*)+$/.test(value);
        const isValidPasswordLength = value.length >= 6 && value.length < 20;
        if (!isValidPassword || !isValidPasswordLength) return { text: true }

        return null
      case InputName.message:
        const isValidMessage = value.length > 0
        if (!isValidMessage) return null;
    }
    throw new Error(`No such name as ${name}`);
  }
}
