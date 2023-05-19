"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a USB device.
 */
class Device {
    /**
     * Creates a new `Device` instance.
     *
     * @param device The `usb.Device` object that this instance wraps.
     * @param description Optional description of the device.
     */
    constructor(device, description) {
        this.vendorId = device.deviceDescriptor.idVendor;
        this.productId = device.deviceDescriptor.idProduct;
        this.type = device.deviceDescriptor.bDeviceClass === 9 ? "Hub" : "Device";
        this.id = this.vendorId + "_" + this.productId;
        if (device.parent) {
            this.parentId =
                device.parent.deviceDescriptor.idVendor +
                    "_" +
                    device.parent.deviceDescriptor.idProduct;
        }
        if (description) {
            this.description = description;
        }
        this.children = [];
    }
}
exports.default = Device;
//# sourceMappingURL=Device.js.map