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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceDescription = exports.customDeviceDescriptorPromise = void 0;
/**
 *   Returns a promise that resolves with the string descriptor of a USB device
 *   or rejects with an error if the descriptor could not be retrieved.
 *   @param {usb.Device} device - The USB device to retrieve the string descriptor from.
 *   @param {number} index - The index of the string descriptor to retrieve.
 *   @return {Promise<string>} - A promise that resolves with the string descriptor of the USB device or rejects with an error.
 */
const customDeviceDescriptorPromise = (device, index) => {
    return new Promise((resolve, reject) => {
        device.getStringDescriptor(index, (error, data) => {
            if (data) {
                resolve(data);
            }
            else {
                reject(error);
            }
        });
    });
};
exports.customDeviceDescriptorPromise = customDeviceDescriptorPromise;
/**
 *   Retrieves device information from a specified USB device, including the manufacturer, product, and serial number.
 *   @param {usb.Device} device - The USB device to retrieve information from.
 *   @return {Promise<IDeviceDescriptor|null>} - A Promise that resolves to an object containing the device's manufacturer, product, and serial number, or null if the device has no such information.
 */
const getDeviceDescription = (device) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDescription = {
        manufacturer: "",
        serialNumber: "",
        product: "",
    };
    try {
        const manufacturerIndex = device.deviceDescriptor.iManufacturer;
        const productIndex = device.deviceDescriptor.iProduct;
        const serialNumberIndex = device.deviceDescriptor.iSerialNumber;
        device.open();
        if (manufacturerIndex !== 0) {
            const manufacturer = yield (0, exports.customDeviceDescriptorPromise)(device, manufacturerIndex);
            //   console.log(`Manufacturer: ${manufacturer}`);
            currentDescription.manufacturer = manufacturer;
        }
        if (productIndex !== 0) {
            const product = yield (0, exports.customDeviceDescriptorPromise)(device, productIndex);
            //   console.log(`Product: ${product}`);
            currentDescription.product = product;
        }
        if (serialNumberIndex !== 0) {
            const serialNumber = yield (0, exports.customDeviceDescriptorPromise)(device, serialNumberIndex);
            //   console.log(`Serial Number: ${serialNumber}`);
            currentDescription.serialNumber = serialNumber;
        }
        device.close();
        if (currentDescription.serialNumber ||
            currentDescription.manufacturer ||
            currentDescription.product) {
            return currentDescription;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log("err");
    }
});
exports.getDeviceDescription = getDeviceDescription;
//# sourceMappingURL=helpers.js.map