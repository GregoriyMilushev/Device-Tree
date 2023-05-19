"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WSWebServer_1 = __importDefault(require("../Servers/WSWebServer"));
/**
 * Factory for creating WSWebServer instances.
 */
class WSFactory {
    /**
     * Creates a WSWebServer instance on a specified port.
     *
     * @param {number} port - The port to create the server on.
     * @return {IWebServer} - The created web server instance.
     */
    createServerOn(port) {
        return new WSWebServer_1.default(port);
    }
}
exports.default = WSFactory;
//# sourceMappingURL=WSFactory.js.map