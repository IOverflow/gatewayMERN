import expressLoader from './expressLoader.js';
import mongooseLoader from './mongooseLoader.js';


export default async ({
    app
}) => {
    // Configure db connection
    const mongoConnection = mongooseLoader();
    console.log("MongoDb Initialized");

    // Initialize express with middlewares
    expressLoader({ app: app });
    console.log("Expressed Initialized");

    // Do some initializations here...
}