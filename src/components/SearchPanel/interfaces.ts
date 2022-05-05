import {Props} from '../../shared/global';

export interface SearchPanelProps extends Props {
	id: string;
	name: string;
	placeholder: string;
	label: string;
	value?: string;
}
