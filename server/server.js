import express from 'express';
import loaders from './loaders';
import configRoutes from './routes';
import setupContainer from './config/dependencyInjectionLoader';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/api.json";


const app = express();
const apiPort = process.env.NODE_ENVIRONMENT_PORT || 3000;

// Load middlewares and start db connection
loaders({
    app: app
});

app.use(cors())

// Setup DI container
const container = setupContainer();

// Configure routes
configRoutes({
    expressApp: app,
    appContainer: container
});

// ------ Add swagger support ------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));