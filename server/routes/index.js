import deviceRouter from './deviceRouter.js';
import gatewayRouter from './gatewayRouter.js';

export default ({ expressApp, appContainer }) => {
    expressApp.use("/gateway", gatewayRouter(appContainer));
    expressApp.use("/device", deviceRouter(appContainer));
    return expressApp;
}