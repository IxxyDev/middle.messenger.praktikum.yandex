enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Option = {
  timeout?: number
  data?: Record<string, string> | any
  method?: METHODS
  headers?: Record<string, string>
  withCredentials?: boolean
}

const queryStringify = (data: Record<string, string|number>) => {

  let queryString = '?';
  const entries = Object.entries(data)

  // possible with .reduce, but I personally don't like it;
  for (let i = 0; i < entries.length; i++) {
    const keyValueParam = queryString + entries[i][0] + '=' + entries[i][1];
    queryString = i + 1 === entries.length ? keyValueParam :  keyValueParam + '&';
  }

  return queryString;
}

export default class HTTPTransport {
	concatURL(data: Record<string, string> | any, url: string) {
		return data ? `${url}${queryStringify(data)}` : url
	}

	get = (url: string, options: Option = {}): Promise<XMLHttpRequest> => {
		return this.request(
			this.concatURL(options.data, url),
			{ ...options, method: METHODS.GET },
			options.timeout
		)
	}

	post = (url: string, options: Option = {}): Promise<XMLHttpRequest> => {
		return this.request(
			this.concatURL(options.data, url),
			{ ...options, method: METHODS.POST },
			options.timeout
		)
	}

	put = (url: string, options: Option = {}): Promise<XMLHttpRequest> => {
		return this.request(
			this.concatURL(options.data, url),
			{ ...options, method: METHODS.PUT },
			options.timeout
		)
	}

	delete = (url: string, options: Option = {}): Promise<XMLHttpRequest> => {
		return this.request(
			this.concatURL(options.data, url),
			{ ...options, method: METHODS.DELETE },
			options.timeout
		)
	}

	request = (
		url: string,
		options: Option = {},
		timeout = 5000
	): Promise<XMLHttpRequest> => {
		const { headers = {}, method = METHODS.GET, data } = options

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()

			xhr.open(
				method,
				method === METHODS.GET && data ? `${url}${queryStringify(data)}` : url
			)
			xhr.setRequestHeader('Content-type', 'text-plain');

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key])
			})

			xhr.onload = () => {
				xhr.status === 200 ? resolve(xhr) : reject(xhr)
			}

			xhr.onabort = reject
			xhr.onerror = reject
			xhr.timeout = timeout
			xhr.ontimeout = reject

			if (!data) {
				xhr.send()
			} else {
				xhr.send(data)
			}
		})
	}
}