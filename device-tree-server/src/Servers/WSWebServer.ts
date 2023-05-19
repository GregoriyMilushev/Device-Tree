import * as WebSocket from "ws";
import IWebServer from "../interfaces/IWebServer";
import { getDeviceTree } from "../Actions/getDeviceTreeAction";
import { usb } from "usb";

/**
 * WebSocket-based web server.
 */
export default class WSWebServer implements IWebServer {
  private server: WebSocket.Server;
  private websocketPort: number;

  /**
   * Constructor for WSWebServer. Creates a WebSocket server on the specified
   * startPort and adds listeners to the USB system to detect device attachment
   * and detachment.
   *
   * @param {number} startPort - The port to start the server on.
   */
  constructor(startPort: number) {
    this.websocketPort = startPort;

    this.server = new WebSocket.Server({ port: this.websocketPort });

    usb.on("attach", async () => await this.broadcastDeviceList());
    usb.on("detach", async () => await this.broadcastDeviceList());
  }

  /**
   * Starts the WebSocket server and listens for incoming connections. Sends the initial
   * list of connected devices to each client upon connection
   * Handles errors and server close events.
   */
  start(): void {
    this.server.on("connection", async (ws: WebSocket) => {
      console.log(`Client connected`);

      await this.sendDeviceList(ws);
    });

    this.server.on("error", (err: Error) => {
      console.error(`Web server error: ${err}`);
    });

    this.server.on("close", () => {
      console.log(`Web server with ${this.websocketPort} is closed`);
      usb.removeListener(
        "attach",
        async () => await this.broadcastDeviceList()
      );
      usb.removeListener(
        "detach",
        async () => await this.broadcastDeviceList()
      );
    });
  }

  /**
   * Stops the web server.
   */
  stop(): void {
    this.server.close();
  }

  /**
   * Sends the device list to a WebSocket.
   *
   * @param {WebSocket} ws - The WebSocket to send the device list to.
   */
  private async sendDeviceList(ws: WebSocket) {
    const treeResult = await getDeviceTree();
    ;
    ws.send(JSON.stringify(treeResult));
  }

  /**
   * Broadcasts the device list to all connected WebSocket clients.
   */
  private async broadcastDeviceList() {
    const treeResult = await getDeviceTree();

    this.server.clients.forEach((ws) => {
      ws.send(JSON.stringify(treeResult));
    });
  }
}
