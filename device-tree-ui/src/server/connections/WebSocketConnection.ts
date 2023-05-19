import DeviceStateCallback from "../../interfaces/DeviceStateCallback";
import IConnectionOptions from "../../interfaces/IConnectionOptions";
import Connection from "./Connection";

/**
 * A WebSocket-based implementation of the Connection interface.
 */
export class WebSocketConnection extends Connection {
  /**
   * Creates a new WebSocketConnection instance.
   * @param options - The connection options.
   */
  constructor(options: IConnectionOptions) {
    super(options);
    this.connectWebSocket();
  }

  /**
   * Establishes a WebSocket connection and sets up a message event listener.
   * @param deviceStateCallback - The callback function to be called when a message is received.
   */
  public connect(deviceStateCallback: DeviceStateCallback): void {
    if (this.connection) {
      this.connection.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        deviceStateCallback(data);
      };
    }
  }

  /**
   * Creates a new WebSocket connection.
   */
  protected connectWebSocket(): void {
    this.connection = new WebSocket(this.baseUrl);
  }

  /**
   * Closes the WebSocket connection if it is currently open.
   */
  public closeWebSocket(): void {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }
}
