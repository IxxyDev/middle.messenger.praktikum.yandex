const parser = new DOMParser()

export default (pugRender: string): HTMLElement => {
	const { body } = parser.parseFromString(pugRender, "text/html")
	const element = body.firstElementChild || body
	return element as HTMLElement
}