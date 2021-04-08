import { Router } from "express";
import bodyParser from 'body-parser';

export default (appContainer) => {

    const gatewayRouter = Router();
    // Resolve our controller using the DI container

    const gatewayController = appContainer.cradle.gatewayController;

    gatewayRouter.post('/create', bodyParser.json(), gatewayController.create);
    gatewayRouter.get('/details/:id', gatewayController.details);
    gatewayRouter.delete('/delete/:id', gatewayController.delete);
    gatewayRouter.get('/list', gatewayController.list);

    return gatewayRouter;
}