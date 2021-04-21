import DataAccessService from "./baseService.js";


export default class DeviceService extends DataAccessService {

    constructor({
        deviceRepository,
        gatewayService
    }) {
        super(deviceRepository);
        this._gatewayService = gatewayService;
    }

    add(entity, callback) {
        const id = entity.gateway;

        this._gatewayService.getById(id, (err, gateway) => {
            if (err)
                return callback(err);

            if (!gateway)
                return callback("Related gateway not found.");

            if (gateway.devices.length >= 10)
                return callback("Gateway can not take more devices.");

            this._repository.create(entity, (err, device) => {

                this._gatewayService.addDevice(id, device._id);
                callback("", device);
            });
        });
    }
}