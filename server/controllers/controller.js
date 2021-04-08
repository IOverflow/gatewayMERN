import logger from "../services/logginService";

export default class CrudController {
    constructor(service) {
        this._service = service;
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.details = this.details.bind(this);
        this.list = this.list.bind(this);
    }

    list(req, res) {
        logger.info("Controller: Hiited /list");
        logger.info(`Controller: Headers: ${req.headers}`)
        this._service.getAll((err, entities) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err,
                    message: "can not get all items"
                });
            }

            return res.status(200).json({
                success: true,
                data: entities
            });
        });
    }

    /**
     * Hitted with POST /{ControllerName}/create/
     * 
     * @return Device JSON object
    
     * @api public
    */
    create(req, res) {
        logger.info("Controller: Hiited /create");
        logger.info(`Controller: Headers: ${req.headers}`)
        const payload = req.body;
        // Check that this endpoint is hitted with a payload
        if (!payload || payload === {}) {
            return res.status(400).json({
                success: false,
                error: "A payload must be provided"
            });
        }

        // Try to save the suplied entity in the db,
        // if a validation error shows up, then notify
        // it with a 400 bad request
        this._service.add(payload, (err, entity) => {
            if (err)
                return res.status(400).json({
                    error: err,
                    message: 'not created'
                });
            // Successfuly created
            return res.status(201).json({
                success: true,
                // return an url to the detail view
                // of the new object
                data: entity,
                message: "created"
            });
        });
    }

    /** 
     * Hitted with GET / {ControllerName} / delete /: id
     * 
     * @return Deleted object on success
     * 
     * @api public
     * */
    delete(req, res) {
        logger.info("Controller: Hiited /delete");
        logger.info(`Controller: Headers: ${req.headers}`)
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Must suply an id"
            });
        }

        this._service.remove(id, (err, entity) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }

            if (!entity) {
                return res.status(404).json({
                    success: false,
                    error: "not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: entity
            });
        });
    }

    /** 
     * Hitted with GET / {ControllerName} / details /: id
     * 
     * @return JSON object on success
     * 
     * @api public
     * */
    details(req, res) {
        logger.info("Controller: Hiited /details");
        logger.info(`Controller: Headers: ${req.headers}`)
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Must suply an id"
            });
        }

        this._service.getById(id, (err, entity) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }

            if (!entity) {
                return res.status(400).json({
                    success: false,
                    error: "not found"
                });
            }

            return res.status(200).json({
                data: entity,
                success: true
            });
        });
    }
}