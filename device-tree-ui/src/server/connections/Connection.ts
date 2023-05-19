import IConnectionOptions from "../../interfaces/IConnectionOptions";

/**
 * Abstract base class representing a network connection.
 */
export default abstract class Connection {
  /**
   * The WebSocket connection.
   */
  protected connection: WebSocket | null = null;

  /**
   * The base URL for the connection.
   */
  protected readonly baseUrl: string;

  /**
   * Creates a new Connection instance.
   * @param options - The connection options.
   */
  constructor(options: IConnectionOptions) {
    this.baseUrl = options.url;
  }
}
