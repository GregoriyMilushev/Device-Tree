import Device, { DEVICE_TYPE_HUB } from "../Models/Device";
import { usb, getDeviceList } from "usb";
import { getDeviceDescription } from "./helpers";
import IDeviceDescriptor from "../interfaces/IDeviceDescriptor";

/**
 * Builds a tree structure of Device objects from an array of Device objects.
 * @param devices An array of Device objects.
 * @returns An array of root-level Device objects that make up the tree structure.
 */
function buildTree(devices: Device[]): Device[] {
  let idMap = new Map<string, Device>();
  let rootDevices: Device[] = [];
  console.log(devices.length, "Count");

  for (let device of devices) {
    idMap.set(device.id, { ...device, children: [] });
  }

  for (let device of devices) {
    let mappedDevice = idMap.get(device.id);
    if (!device.parentId) {
      rootDevices.push(mappedDevice);
    } else {
      let parentDevice = idMap.get(device.parentId);
      if (parentDevice && parentDevice.type === DEVICE_TYPE_HUB) {
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
export const getDeviceTree = async () => {
  const usbDevices: usb.Device[] = getDeviceList();
  const devicePromises: Promise<Device>[] = usbDevices.map(async (device) => {
    const description: IDeviceDescriptor = await getDeviceDescription(device);
    return new Device(device, description);
  });
  const devices = await Promise.all(devicePromises);
  const tree = buildTree(devices);
  
  return tree;
};
