// import usb from 'usb';
// import { DeviceNode } from './types';
// export function buildDeviceTree(): DeviceNode[] {
//   const tree: DeviceNode[] = [];
//   const hubs: { [key: string]: DeviceNode } = {};
//   // Find all USB devices
//   const devices = usb.getDeviceList();
//   devices.forEach((device) => {
//     const node: DeviceNode = {
//       name: device.deviceDescriptor.iProduct ? device.deviceDescriptor.iProduct : `Device ${device.deviceAddress}`,
//     };
//     if (device.parent && device.parent.busNumber === 1) {
//       // Device is connected directly to the root hub
//       tree.push(node);
//     } else if (device.parent) {
//       // Device is connected to a hub
//       const hubId = `${device.parent.busNumber}-${device.parent.deviceAddress}`;
//       let hub = hubs[hubId];
//       if (!hub) {
//         // Create a new hub node
//         hub = {
//           name: `Hub ${device.parent.deviceAddress}`,
//           children: [],
//         };
//         hubs[hubId] = hub;
//         tree.push(hub);
//       }
//       hub.children?.push(node);
//     }
//   });
//   return tree;
// }
// export function updateDeviceTree(): DeviceNode[] {
//   const deviceTree: DeviceNode[] = buildDeviceTree();
//   return deviceTree;
// }
// // Update the device tree when a USB device is connected or disconnected
// usb.on('attach', () => {
//   updateDeviceTree();
// });
// usb.on('detach', () => {
//   updateDeviceTree();
// });
//# sourceMappingURL=usb.js.map