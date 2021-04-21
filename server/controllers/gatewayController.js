import CrudController from './controller.js';

/**
    App endpoints for CRUD operations related to
    the gateway model.
*/
export default class GatewayController extends CrudController {

    // Declare Services to be injected through DI.
    constructor(
        // Services
        {
            gatewayService,
            logginService
        }
    ) {
        super(gatewayService);
        this.logginService = logginService;
    }

    /** 
     * Hitted with GET / gateway / details /: id
     * 
     * @return JSON object on success
     * 
     * @api public
     * */
    details(req, res) {
        // Need to override this method
        // so we can include related devices
        // fields.

        const id = req.params.id;

        this.logginService.info("Hitted /gateway/details");

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Must suply an id"
            });
        }

        this._service.getById(id, (err, gateway) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }

            if (!gateway) {
                return res.status(400).json({
                    success: false,
                    error: "Gateway not found"
                });
            }

            this.logginService.info("Succesful query.");
            this.logginService.info(`Response: ${gateway.name}`);

            return res.status(200).json({
                data: gateway,
                success: true
            });
        }, {
            includables: "devices"
        });
    }

    /**
     * Overrides base controller list method
     * to include related data to the Gateways, ie, devices.
     * @param {*} req 
     * @param {*} res 
     */
    list(req, res) {
        this.logginService.info("Hitted /gateway/list");
        this._service.getAll((err, entities) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err,
                    message: "can not get all items"
                });
            }
            
            this.logginService.info(`Success: ${entities}`);

            return res.status(200).json({
                success: true,
                data: entities
            });
        }, {
            includables: "devices"
        });
    }
}