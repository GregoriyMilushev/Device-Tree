"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = __importStar(require("ws"));
const getDeviceTreeAction_1 = require("../Actions/getDeviceTreeAction");
const usb_1 = require("usb");
/**
 * WebSocket-based web server.
 */
class WSWebServer {
    /**
     * Constructor for WSWebServer.
     *
     * @param {number} startPort - The port to start the server on.
     */
    constructor(startPort) {
        this.websocketPort = startPort;
        console.log('Starting Server');
        this.server = new WebSocket.Server({ port: this.websocketPort });
    }
    /**
     * Starts the WebSocket server and listens for incoming connections. Sends the initial
     * list of connected devices to each client upon connection, and updates the list when
     * devices are attached or detached from the system.
     * Handles errors and server close events.
     */
    start() {
        this.server.on("connection", (ws) => {
            console.log(`Client connected`);
            this.sendDeviceList(ws);
            usb_1.usb.on("attach", () => this.sendDeviceList(ws));
            usb_1.usb.on("detach", () => this.sendDeviceList(ws));
        });
        this.server.on("error", (err) => {
            console.error(`Web server error: ${err}`);
        });
        this.server.on("close", () => {
            console.log(`Web server with ${this.websocketPort} is closed`);
        });
    }
    /**
     * Stops the web server.
     */
    stop() {
        this.server.close();
    }
    /**
     * Retrieves the list of USB devices as tree.
     *
     * @return {Device[]} - The list of USB devices.
     */
    getDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = (0, usb_1.getDeviceList)();
            const tree = yield (0, getDeviceTreeAction_1.getDeviceTree)(devices);
            return tree;
        });
    }
    /**
     * Sends the device list to a WebSocket.
     *
     * @param {WebSocket} ws - The WebSocket to send the device list to.
     */
    sendDeviceList(ws) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getDevices();
            ws.send(JSON.stringify(result));
        });
    }
}
exports.default = WSWebServer;
//# sourceMappingURL=WSWebServer.js.map