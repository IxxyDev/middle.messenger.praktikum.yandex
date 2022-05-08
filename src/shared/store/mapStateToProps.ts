import store from './store';

export function mapStateToProps(path: string): void {
	const reducedPath = path
		.split('.')
		.reduce((acc, key) => acc[key], store.getState());
	this.setProps(reducedPath);
}
