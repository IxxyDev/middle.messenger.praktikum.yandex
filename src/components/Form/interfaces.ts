import {Props} from '../../shared/global';

type FormInput = {
	id: string
	label: string
	placeholder: string
	required?: boolean
	name: string
	type: string
};

export interface FormProps extends Props {
	inputs: FormInput[]
	title: string
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	action?: string
	submitButtonLabel?: string
}
