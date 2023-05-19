import WSWebServer from "../Servers/WSWebServer";
import IWebServer from "../interfaces/IWebServer";
import IWebServerFactory from "../interfaces/IWebServerFactory";

/**
 * Factory for creating WSWebServer instances.
 */
export default class WSFactory implements IWebServerFactory {
  /**
   * Creates a WSWebServer instance on a specified port.
   *
   * @param {number} port - The port to create the server on.
   * @return {IWebServer} - The created web server instance.
   */
  createServerOn(port: number): IWebServer {
    return new WSWebServer(port);
  }
}
