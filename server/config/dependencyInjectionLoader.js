import {
    asClass,
    asValue,
    createContainer,
    InjectionMode
} from "awilix";
import DeviceController from "../controllers/deviceController.js";
import GatewayController from "../controllers/gatewayController.js";
import DeviceModel from "../models/deviceModel.js";
import GatewayModel from "../models/gatewayModel.js";
import DeviceService from "../services/deviceService.js";
import GatewayService from "../services/gatewayService.js";
import logger from "../services/logginService.js";

const setupContainer = (container = createContainer({
    injectionMode: InjectionMode.PROXY
})) => {
    // Wire up dependencies here

    container.register({
        gatewayRepository: asValue(GatewayModel),

        deviceRepository: asValue(DeviceModel),

        gatewayService: asClass(GatewayService),

        deviceService: asClass(DeviceService),

        logginService: asValue(logger),

        gatewayController: asClass(GatewayController),

        deviceController: asClass(DeviceController)
    });

    return container;
}

export default setupContainer;