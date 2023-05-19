"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceTree = void 0;
const Device_1 = __importDefault(require("../Models/Device"));
const helpers_1 = require("./helpers");
/**
 * Builds a tree structure of Device objects from an array of Device objects.
 * @param devices An array of Device objects.
 * @returns An array of root-level Device objects that make up the tree structure.
 */
function buildTree(devices) {
    let idMap = new Map();
    let rootDevices = [];
    console.log(devices.length, "Count");
    // Initialize the map
    for (let device of devices) {
        idMap.set(device.id, Object.assign(Object.assign({}, device), { children: [] }));
    }
    // Populate children and determine roots
    for (let device of devices) {
        let mappedDevice = idMap.get(device.id);
        if (!device.parentId) {
            rootDevices.push(mappedDevice);
        }
        else {
            let parentDevice = idMap.get(device.parentId);
            if (parentDevice && parentDevice.type === "Hub") {
                parentDevice.children.push(mappedDevice);
            }
        }
    }
    return rootDevices;
}
/**
 * Gets a tree structure of Device objects from an array of usb.Device objects.
 * @param usbDevices An array of usb.Device objects to get the tree structure from.
 * @returns A Promise that resolves with an array of root-level Device objects that make up the tree structure.
 */
const getDeviceTree = (usbDevices) => __awaiter(void 0, void 0, void 0, function* () {
    const devicePromises = usbDevices.map((device) => __awaiter(void 0, void 0, void 0, function* () {
        const description = yield (0, helpers_1.getDeviceDescription)(device);
        return new Device_1.default(device, description);
    }));
    const devices = yield Promise.all(devicePromises);
    const tree = buildTree(devices);
    return tree;
});
exports.getDeviceTree = getDeviceTree;
//# sourceMappingURL=getDeviceTreeAction.js.map