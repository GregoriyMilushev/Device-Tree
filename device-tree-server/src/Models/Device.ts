import IDeviceDescriptor from "../interfaces/IDeviceDescriptor";
import { usb } from "usb";

export const DEVICE_TYPE_HUB = "Hub";
export const DEVICE_TYPE_DEVICE = "Device";

/**
 * Represents a USB device.
 */
export default class Device {
  /**
   * Creates a new `Device` instance.
   *
   * @param device The `usb.Device` object that this instance wraps.
   * @param description Optional description of the device.
   */
  constructor(device: usb.Device, description?: IDeviceDescriptor) {
    this.vendorId = device.deviceDescriptor.idVendor;
    this.productId = device.deviceDescriptor.idProduct;
    this.type = device.deviceDescriptor.bDeviceClass === 9 ? DEVICE_TYPE_HUB : DEVICE_TYPE_DEVICE;
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

  /**
   * The unique identifier of the device, constructed by combining the
   * vendor ID and product ID of the device.
   */
  id: string;

  /**
   * The vendor ID of the device.
   */
  vendorId: number;

  /**
   * The product ID of the device.
   */
  productId: number;

  /**
   * The type of the device, which can be either "Device" or "Hub".
   */
  type: string;

  /**
   * Optional description of the device, containing information such as
   * the manufacturer, product name, and serial number.
   */
  description?: IDeviceDescriptor;

  /**
   * An array of child devices, if any.
   */
  children: Device[];

  /**
   * The ID of the parent device, if any.
   */
  parentId?: string;
}
