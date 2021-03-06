import { FormValidation, InputName, Invalid } from "./interfaces";

export class Validation implements FormValidation {
  hasValidation(InputName: string): InputName is InputName {
    return Object.values<string>(InputName).includes(InputName);
  }

  validateInput(input: HTMLInputElement): Invalid {
    const { name, value } = input;
    if (!name) throw new Error("No name attr for this input");

    switch (name) {
      case InputName.firstName:
      case InputName.lastName:
        const isValidName = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(value);
        if (!isValidName) return { text: true };
        return null;

      case InputName.login:
        const isValidText = /^(\d*[a-zA-Z\-_]\d*)+$/.test(value);
        const isValidLength = value.length >= 2 && value.length < 15;
        if (!isValidText || !isValidLength) {
          return { text: true };
        }

        return null;
      case InputName.email:
        const isValidEmail = /^([\w-.]+@[a-zA-Z]+.[a-z]+)$/.test(value);
        if (!isValidEmail) {
          return { text: true };
        }

        return null;
      case InputName.password:
      case InputName.repeatPassword:
        const isValidPassword = /^(.*([A-Z]+.*\d+|\d+.*[A-Z]+).*)+$/.test(value);
        const isValidPasswordLength = value.length >= 6 && value.length < 20;
        if (!isValidPassword || !isValidPasswordLength) {
          return { text: true };
        }

        return null;
      case InputName.phone:
        const isValidPhone = /^\+*[\d]{10,20}$/.test(value);
        if (!isValidPhone) {
          return { text: true };
        }

        return null;
      case InputName.message:
        const isValidMessage = value.length > 0;
        if (!isValidMessage) {
          return null;
        }
    }

    throw new Error(`No such name as ${name}`);
  }
}
