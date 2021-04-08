import MockDevice from "./MockDevice";
import MockDeviceRepository from "./MockDeviceRepository";
import MockGateway from "./MockGateway";

export default class MockGatewayRepository {
    constructor(
    ) {
        this.deviceStore = new MockDeviceRepository();
        // setup the mock gateway store
        this.collection = undefined;
        this.error = "";
        this.store = [
            new MockGateway({
                _id: 1,
                serialNumber: "1",
                name: "Gateway1",
                ipv4: "127.0.0.1",
                devices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }),
        ];

        this.exec = this.exec.bind(this);
        this.find = this.find.bind(this);
        this.create = this.create.bind(this);
        this.findOneAndRemove = this.findOneAndRemove.bind(this);
        this.populate = this.populate.bind(this);
    }

    exec(callback) {
        if (this.collection === undefined)
            callback(this.error);

        callback(this.error, this.collection);
    }

    find() {
        this.collection = this.store;
        this.error = "";
        return this;
    }

    findById(id) {
        this.collection = this.store.find((mockGateway) => mockGateway._id == id);
        if (this.collection === undefined) {
            this.error = `Gateway with id: ${id} not found`;
            return this;
        }
        this.error = "";
        return this;
    }

    create(entity, callback) {
        const mock = new MockGateway(entity);
        mock._id = this.store.length + 1;
        this.store.push(mock);
        callback(this.error, mock);
    }

    populate(path) {
        if (this.collection instanceof Array) {
            this.collection.forEach(gateway => {
                gateway.devices = gateway.devices.map(id => {
                    if (typeof id === "number")
                        return this.deviceStore.store.find(d => d._id == id);

                    return id;
                });
            });
            return this;
        } else {
            this.collection.devices = this.collection.devices.map(id => {
                if (typeof id === "number")
                    return this.deviceStore.store.find(d => d._id == id);
                
                return id;
            });
            return this;
        }
    }

    findOneAndRemove({
        _id
    }, callback) {
        const g = this.store.find((m) => m._id == _id);
        if (!g) {
            this.error = "Gateway not found";
            callback(this.error);
        }

        this.store = this.store.filter((m) => m._id != _id);
        this.error = "";
        callback(this.error, g);
    }
}