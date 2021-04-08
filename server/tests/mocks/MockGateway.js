
export default class MockGateway {
    constructor (obj) {
        this._id = obj._id;
        this.name = obj.name;
        this.ipv4 = obj.ipv4;
        this.serialNumber = obj.serialNumber;
        this.devices = obj.devices;
    }
}