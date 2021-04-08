/**
 * Setup a fake server with mocked repositories
 * to test endpoints functionalities.
 */

import {
    asClass,
    asValue,
    createContainer,
    InjectionMode
} from 'awilix';
import express from 'express';
import DeviceController from '../controllers/deviceController';
import GatewayController from '../controllers/gatewayController';
import DeviceService from '../services/deviceService';
import GatewayService from '../services/gatewayService';
import configRoutes from '../routes';
import MockGatewayRepository from './mocks/MockGatewayRepository';
import MockDeviceRepository from './mocks/MockDeviceRepository';
import cors from 'cors'
import bodyParser from 'body-parser';
import logger from '../services/logginService';

const app = express();

// load all middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Configure the DI container
const container = createContainer({
    injectionMode: InjectionMode.PROXY
});

container.register({
    // Register our mock repository
    logginService: asValue(logger),

    gatewayRepository: asClass(MockGatewayRepository).singleton(),

    deviceRepository: asClass(MockDeviceRepository).singleton(),

    gatewayService: asClass(GatewayService).scoped(),

    deviceService: asClass(DeviceService).scoped(),

    gatewayController: asClass(GatewayController).scoped(),

    deviceController: asClass(DeviceController).scoped()
});

configRoutes({
    expressApp: app,
    appContainer: container
});

// Export our server so every test case can listen to different ports
export default app;