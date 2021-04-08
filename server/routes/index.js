import deviceRouter from './deviceRouter';
import gatewayRouter from './gatewayRouter';

export default ({ expressApp, appContainer }) => {
    expressApp.use("/gateway", gatewayRouter(appContainer));
    expressApp.use("/device", deviceRouter(appContainer));
    return expressApp;
}