#! /usr/bin/env node

import express from 'express';
import loaders from './loaders/index.js';
import configRoutes from './routes/index.js';
import setupContainer from './config/dependencyInjectionLoader.js';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import pkg from 'module';
const { createRequire } = pkg;
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger/api.json");


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