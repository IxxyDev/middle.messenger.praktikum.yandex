import {WebSocketApi} from '../../api/websocket/websocket';
import {WSS_HOST} from '../../api/baseApi';
import {CloseCode, LastMessageResponse} from '../../api/websocket/interfaces';
import {MessageResponse} from '../../api/websocket/interfaces';

type Then = {
	then: (cb: (isOpened: boolean) => void) => void;
};

class WebSocketController {
	private webSocketApi: WebSocketApi;
	private url: string;
	private openSocket: (isOpened: boolean) => void;
	public isOpened = false;

	public start(userId: number, chatId: number, token: string): Then {
		this.url = `${WSS_HOST}/ws/${userId}/${chatId}/${token}`;

		return this.openConnection();
	}

	private openConnection(): Then {
		this.webSocketApi = new WebSocketApi(this.url);

		this.close();
		this.error();

		return {
			then: (cb: (isOpened: boolean) => void) => {
				this.openSocket = cb;

				this.webSocketApi.open((successMessage: string) => {
					this.isOpened = true;
					cb(true);
					this.webSocketApi.ping();
					console.log(successMessage);
				});
			},
		};
	}

	public close(): void {
		this.webSocketApi.close((successMessage: string) => {
			this.isOpened = false;
			console.log(successMessage);
		},
		() => {
			this.isOpened = false;
			this.openConnection().then(this.openSocket);
		});
	}

	public error(): void {
		this.webSocketApi.error((event: Event) => {
			this.isOpened = false;
			console.log(event);
		});
	}

	public send(message: string) {
		this.webSocketApi.send(message);
	}

	public subscribe(cb: (res: MessageResponse) => void): void {
		this.webSocketApi.message(res => {
			if (res.type === 'message' && !Array.isArray(res)) {
				cb(res);
			}
		});
	}

	public getLastMessages(cb: (res: LastMessageResponse[]) => void, messagesCount = 0): void {
		this.webSocketApi.message(res => {
			if (Array.isArray(res)) {
				cb(res);
			}
		});
		this.webSocketApi.send(messagesCount.toString());
	}

	public closeConnection(code: CloseCode = CloseCode.Success, reason?: string): void {
		this.webSocketApi.closeConnection(code, reason);
	}
}

export const webSocketController = new WebSocketController();
