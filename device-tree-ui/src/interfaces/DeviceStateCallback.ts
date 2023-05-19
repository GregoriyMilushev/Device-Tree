import IDevice from "./IDevice";

export default interface DeviceStateCallback {
    (data: IDevice[]): void;
}