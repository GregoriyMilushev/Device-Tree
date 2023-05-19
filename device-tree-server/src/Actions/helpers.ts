import IDeviceDescriptor from "../interfaces/IDeviceDescriptor";
import { usb } from "usb";

/**
 *   Returns a promise that resolves with the string descriptor of a USB device
 *   or rejects with an error if the descriptor could not be retrieved.
 *   @param {usb.Device} device - The USB device to retrieve the string descriptor from.
 *   @param {number} index - The index of the string descriptor to retrieve.
 *   @return {Promise<string>} - A promise that resolves with the string descriptor of the USB device or rejects with an error.
 */
export const customDeviceDescriptorPromise = (
  device: usb.Device,
  index: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    device.getStringDescriptor(index, (error, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(error);
      }
    });
  });
};

/**
 *   Retrieves device information from a specified USB device, including the manufacturer, product, and serial number.
 *   @param {usb.Device} device - The USB device to retrieve information from.
 *   @return {Promise<IDeviceDescriptor|null>} - A Promise that resolves to an object containing the device's manufacturer, product, and serial number, or null if the device has no such information.
 */
export const getDeviceDescription = async (device: usb.Device) => {
  const currentDescription: IDeviceDescriptor = {
    manufacturer: "",
    serialNumber: "",
    product: "",
  };
  try {
    const manufacturerIndex: number = device.deviceDescriptor.iManufacturer;
    const productIndex: number = device.deviceDescriptor.iProduct;
    const serialNumberIndex: number = device.deviceDescriptor.iSerialNumber;

    device.open();
    if (manufacturerIndex !== 0) {
      const manufacturer = await customDeviceDescriptorPromise(
        device,
        manufacturerIndex
      );
      
      currentDescription.manufacturer = manufacturer;
    }

    if (productIndex !== 0) {
      const product = await customDeviceDescriptorPromise(device, productIndex);
      
      currentDescription.product = product;
    }

    if (serialNumberIndex !== 0) {
      const serialNumber = await customDeviceDescriptorPromise(
        device,
        serialNumberIndex
      );
      
      currentDescription.serialNumber = serialNumber;
    }

    device.close();

    if (
      currentDescription.serialNumber ||
      currentDescription.manufacturer ||
      currentDescription.product
    ) {
      return currentDescription;
    } else {
      return null;
    }
  } catch (err) {
    // console.log(err);
  }
};
