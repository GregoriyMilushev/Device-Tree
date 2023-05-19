/**
 * Interface for web servers.
 */
export default interface IWebServer {
  /**
   * Starts the web server.
   */
  start(): void;

  /**
   * Stops the web server.
   */
  stop(): void;
}
