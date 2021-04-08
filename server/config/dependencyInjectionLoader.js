import {
    asClass,
    asValue,
    createContainer,
    InjectionMode
} from "awilix";
import DeviceController from "../controllers/deviceController";
import GatewayController from "../controllers/gatewayController";
import DeviceModel from "../models/deviceModel";
import GatewayModel from "../models/gatewayModel";
import DeviceService from "../services/deviceService";
import GatewayService from "../services/gatewayService";
import logger from "../services/logginService";

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