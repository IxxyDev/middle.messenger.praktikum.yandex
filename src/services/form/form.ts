import {FormValidation, InputName, Invalid, ValidItem} from './interfaces';

export class HandleForm {
	private readonly formValidation: FormValidation;

	constructor(formValidation: FormValidation) {
		this.formValidation = formValidation;
	}

	// Default serialization
	private serialize({elements}: HTMLFormElement): Element | undefined {
		return Array.from(elements)
			.filter((element: HTMLInputElement) => Boolean(element.name))
			.reduce<Record<string, string>>((result, element: HTMLInputElement) => {
			const {name, value} = element;
			result[name] = value;

			return result;
		}, {});
	}

	handleSubmit(event: Event): Record<string, string> | undefined {
		event.preventDefault();
		return this.serialize(event.target as HTMLFormElement);
	}

	handleBlur(event: Event): Invalid {
		const input = event.target as HTMLInputElement;
		const invalid = this.formValidation.validateInput(input);

		if (invalid) {
			input.classList.add('invalid');
		}

		return invalid;
	}

	handleFocus(event: Event): void {
		const input = event.target as HTMLInputElement;
		input.classList.remove('invalid');
	}

	validate(event: Event): ValidItem[] {
		const {elements} = event.target as HTMLFormElement;

		return Array.from(elements)
			.filter((input: HTMLInputElement) => Boolean(input.name))
			.map((input: HTMLInputElement) => {
				const hasValidation = this.formValidation.hasValidation(input.name);
				const invalid = this.formValidation.validateInput(input);
				const error = document.querySelector(`[error=${input.id}]`);
				const data = error?.getAttribute('data');

				if (!hasValidation) {
					return null;
				}

				if (invalid) {
					input.classList.add('invalid');
				}

				if (!error) {
					throw new Error('No element with such id');
				}

				if (!data) {
					throw new Error('No data attr for input with such id');
				}

				return {
					fieldName: input.name as InputName,
					dataName: data,
					invalid,
				};
			});
	}
}
