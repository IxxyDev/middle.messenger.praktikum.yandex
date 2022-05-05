import {CloseCode, Data} from './interfaces';

export class WebSocketApi {
	private readonly socket: WebSocket;

	constructor(url: string) {
		this.socket = new WebSocket(url)
	}

	private TIMEOUT = 10000

	open(cb: (successMessage: string) => void): void {
		this.socket.addEventListener('open', () => {
			cb('Connection established');
		});
	}

	close(success: (message: string) => void, error: (message: string) => void): void {
		this.socket.addEventListener('close', event => {
			if (event.wasClean) {
				success('Connection closed');
			} else {
				error('Connection is broken');
			}
		});
	}

	closeConnection(code: CloseCode = CloseCode.Success, reason?: string): void {
		this.socket.close(code, reason);
	}

	message(cb: (data: Data) => void): void {
		this.socket.addEventListener('message', event => {
			if (typeof event.data === 'string') {
				cb(JSON.parse(event.data));
			} else {
				cb(event.data);
			}
		});
	}

	send(message: string, type = 'message'): void {
		this.socket.send(JSON.stringify({
			content: message,
			type,
		}));
	}

	error(cb: (event: Event) => void): void {
		this.socket.addEventListener('error', event => {
			cb(event);
		});
	}

	ping(): void {
		const sendPing = (): void => {
			this.socket.send(JSON.stringify({ type: 'ping' }))
			console.log('websocket ping')
		}

		if (!this.socket || this.socket.readyState !== 1) return
		setTimeout(() => this.ping(), this.TIMEOUT)
	}
}
