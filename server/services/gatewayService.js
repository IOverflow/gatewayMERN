import DataAccessService from "./baseService.js";


export default class GatewayService extends DataAccessService {
    constructor({
        gatewayRepository
    }) {
        // Inject the Gateway Model as repository
        super(gatewayRepository);
        this.addDevice = this.addDevice.bind(this);
        this.removeDevice = this.removeDevice.bind(this);
    }

    /**
     * Add the device represented by deviceId
     * to the list of devices of the gateway
     * represented by gatewayId.
     * @param {*} gatewayId 
     * @param {*} deviceId 
     */
    async addDevice(gatewayId, deviceId) {
        return await this._repository.findByIdAndUpdate(
            gatewayId,
            {
                $push: {
                    devices: deviceId
                }
            }
        )
    }

    /**
     * Remove the given device from the list of
     * devices of the given gateway.
     * @param {*} deviceId 
     * @param {*} gatewayId 
     */
    async removeDevice(deviceId, gatewayId) {
        return await this._repository.findByIdAndUpdate(
            gatewayId,
            {
                $pull: {
                    devices: deviceId
                }
            }
        );
    }
}