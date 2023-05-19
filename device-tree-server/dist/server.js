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
const express_1 = __importDefault(require("express"));
// import { updateDeviceTree } from './usb';
const usb_1 = require("usb");
const dotenv = __importStar(require("dotenv"));
const WebSocket = __importStar(require("ws"));
dotenv.config();
// Switch to the UsbDk backend
usb_1.usb.useUsbDkBackend();
const app = (0, express_1.default)();
const port = Number(process.env.PORT);
const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
const wss = new WebSocket.Server({ port: 3034 });
wss.on('connection', (ws) => {
    console.log('Client connected');
    const sendDeviceList = () => {
        const devices = (0, usb_1.getDeviceList)();
        const result = [];
        devices.forEach(device => {
            const vendorId = device.deviceDescriptor.idVendor;
            const productId = device.deviceDescriptor.idProduct;
            const type = device.deviceDescriptor.bDeviceClass === 9 ? 'Hub' : 'Device';
            let stringDescription = '';
            const manufacturerIndex = device.deviceDescriptor.iManufacturer;
            const productIndex = device.deviceDescriptor.iProduct;
            const serialNumberIndex = device.deviceDescriptor.iSerialNumber;
            const currentDevice = (0, usb_1.findByIds)(vendorId, productId);
            currentDevice.open();
            if (manufacturerIndex !== 0) {
                currentDevice.getStringDescriptor(manufacturerIndex, (error, data) => {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log(`Manufacturer: ${data}`);
                        stringDescription += `Manufacturer: ${data},`;
                    }
                });
            }
            if (productIndex !== 0) {
                currentDevice.getStringDescriptor(productIndex, (error, data) => {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log(`Product: ${data}`);
                        stringDescription += `Product: ${data},`;
                    }
                });
            }
            if (serialNumberIndex !== 0) {
                currentDevice.getStringDescriptor(productIndex, (error, data) => {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log(`Serial Number: ${data}`);
                        stringDescription += `Serial Number: ${data}`;
                    }
                    // device.close();
                });
            }
            result.push({
                vendorId: vendorId,
                productId: productId,
                type: type,
                stringDescription: stringDescription
            });
        });
        // const result = devices.map(device => ({
        //   vendorId: device.deviceDescriptor.idVendor,
        //   productId: device.deviceDescriptor.idProduct,
        //   type: device.deviceDescriptor.bDeviceClass === 9 ? 'Hub' : 'Device'
        // }));
        ws.send(JSON.stringify(result));
    };
    sendDeviceList();
    usb_1.usb.on('attach', sendDeviceList);
    usb_1.usb.on('detach', sendDeviceList);
    ws.on('close', () => {
        console.log('Client disconnected');
        usb_1.usb.removeListener('attach', sendDeviceList);
        usb_1.usb.removeListener('detach', sendDeviceList);
    });
});
//# sourceMappingURL=server.js.map