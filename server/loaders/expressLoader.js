import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export default ({
    app
}) => {

    // Register Middlewares to use in every request here.
    app.use(cors());

    return app;
}