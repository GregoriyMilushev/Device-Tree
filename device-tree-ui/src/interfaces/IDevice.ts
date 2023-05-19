import IDeviceDescription from "./IDeviceDescription";

/**
 * Interface representing a device.
 */
export default interface IDevice {
  /**
   * The device ID.
   */
  id: string;

  /**
   * The vendor ID.
   */
  vendorId: number;

  /**
   * The product ID.
   */
  productId: number;

  /**
   * The device type.
   */
  type: number;

  /**
   * The parent device ID (optional).
   */
  parentId?: string;

  /**
   * The device description (optional).
   */
  description?: IDeviceDescription;

  /**
   * The child devices (optional).
   */
  children?: IDevice[];
}
