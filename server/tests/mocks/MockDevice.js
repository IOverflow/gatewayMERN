
export default class MockDevice {
    constructor (device) {
        this._id = device._id;
        this.gateway = device.gateway;
        this.status = device.status;
        this.uid = device.uid;
        this.vendor = device.vendor;
        this.date = device.date;
    }
}