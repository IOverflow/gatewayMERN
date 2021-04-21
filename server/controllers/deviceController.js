import CrudController from "./controller.js";


export default class DeviceController extends CrudController {
    constructor({
        deviceService,
        gatewayService
    }) {
        super(deviceService);
        this.gatewayService = gatewayService;
        this.removeFromGateway = this.removeFromGateway.bind(this);
        this.addToGateway = this.addToGateway.bind(this);
    }

    removeFromGateway(req, res) {
        let deviceId = req.params.id;

        if (!deviceId) {
            return res.status(400).json({
                success: false,
                error: "Must suply and id"
            });
        }

        this._service.getById(deviceId, (err, device) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    error: err
                });

            this.gatewayService.removeDevice(deviceId, device.gateway);

            device.gateway = "";
            this._service.update(device, (err, dev) => {
                if (err)
                    return res.status(400).json({
                        success: false,
                        error: err
                    });
                return res.status(200).json({
                    success: true
                });
            });
        });
    }

    addToGateway(req, res) {
        let deviceId = req.params.id;
        let gatewayId = req.body.id;

        if (!gatewayId || !deviceId)
            return res.status(400).json({
                success: false,
                error: "Must suply gatewayId and deviceId"
            });

        this._service.getById(deviceId, (err, device) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    error: err
                });

            this.gatewayService.removeDevice(deviceId, device.gateway);
            device.gateway = gatewayId;

            this._service.update(device, (error, dev) => {
                if (error)
                    return res.status(400).json({
                        error: error,
                        success: false
                    });

                this.gatewayService.addDevice(gatewayId, deviceId);

                return res.status(200).json({
                    success: true
                });
            });
        });
    }
}