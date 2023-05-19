import IWebServer from "../interfaces/IWebServer";
import IWebServerFactory from "../interfaces/IWebServerFactory";

export default class HttpFactory implements IWebServerFactory {
  createServerOn(port: number): IWebServer {
    throw new Error("Not Implemented");
  }
}
