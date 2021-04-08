import {
    Router
} from "express";

import bodyParser from 'body-parser';

export default (appContainer) => {
    const deviceRouter = Router();

    // Resolve the controller using DI
    const deviceController = appContainer.cradle.deviceController;

    /**
     * @swagger
     * /gateway/details/:id:
     *  get:
     *      description: Returns JSON object with representing @id Gateway.
     *      responses:
     *          200:
     *              description: Gateway with _id = @id
     *      
     *          400:
     *              description: Bad request, usually because suplied @id could not be found.
     */
    deviceRouter.get("/details/:id", deviceController.details);
    deviceRouter.post("/create", bodyParser.json(), deviceController.create);
    deviceRouter.delete("/delete/:id", deviceController.delete);
    deviceRouter.get("/list", deviceController.list);
    deviceRouter.get("/removeFromGateway/:id", deviceController.removeFromGateway);
    deviceRouter.post("/addToGateway/:id", bodyParser.json(), deviceController.addToGateway);

    return deviceRouter;
}