import MockDevice from "./MockDevice";

export default class MockDeviceRepository {
    constructor() {
        this.collection = undefined;
        this.error = "";
        this.store = [
            new MockDevice({
                _id: 1,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor1",
                date: new Date()
            }),

            new MockDevice({
                _id: 2,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor1",
                date: new Date()
            }),

            new MockDevice({
                _id: 3,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor1",
                date: new Date()
            }),

            new MockDevice({
                _id: 4,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor3",
                date: new Date()
            }),

            new MockDevice({
                _id: 5,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor2",
                date: new Date()
            }),

            new MockDevice({
                _id: 6,
                gateway: 1,
                uid: 128,
                status: "offline",
                vendor: "vendor1",
                date: new Date()
            }),

            new MockDevice({
                _id: 7,
                gateway: 1,
                uid: 128,
                status: "offline",
                vendor: "vendor1",
                date: new Date()
            }),

            new MockDevice({
                _id: 8,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor2",
                date: new Date()
            }),

            new MockDevice({
                _id: 9,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor3",
                date: new Date()
            }),

            new MockDevice({
                _id: 10,
                gateway: 1,
                uid: 128,
                status: "online",
                vendor: "vendor3",
                date: new Date()
            }),
        ]

        this.exec = this.exec.bind(this);
        this.find = this.find.bind(this);
        this.create = this.create.bind(this);
        this.findOneAndRemove = this.findOneAndRemove.bind(this);
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
        this.collection = this.store.find((mock) => mock._id == id);
        if (this.collection === undefined) {
            this.error = `Gateway with id: ${id} not found`;
            return this;
        }
        this.error = "";
        return this;
    }

    create(entity, callback) {
        const mock = new MockDevice(entity);
        mock._id = this.store.length + 1;
        this.store.push(mock);
        callback(this.error, mock);
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