import IWebServer from "./IWebServer";

/**
 * Factory interface for creating web servers.
 */
export default interface IWebServerFactory {
  /**
   * Creates a web server on a specified port.
   *
   * @param {number} port - The port to create the server on.
   * @return {IWebServer} - The created web server instance.
   */
  createServerOn: (port: number) => IWebServer;
}
