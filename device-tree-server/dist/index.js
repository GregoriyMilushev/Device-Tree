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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Express } from "express";
// import { updateDeviceTree } from './usb';
// import { usb, getDeviceList } from "usb";
// import * as WebSocket from "ws";
// import { Device, DeviceTree } from "./types";
// import { getDeviceTree } from "./Actions/getDeviceTreeAction";
const dotenv = __importStar(require("dotenv"));
const WSFactory_1 = __importDefault(require("./Factories/WSFactory"));
dotenv.config();
// const app: Express = express();
// const port: number = Number(process.env.HTTP_PORT);
const websocketPort = Number(process.env.WEBSOCKET_PORT);
const WSServer = new WSFactory_1.default();
WSServer.createServerOn(websocketPort).start();
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });
// const server = app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
//# sourceMappingURL=index.js.map