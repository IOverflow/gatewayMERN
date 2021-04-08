import expressLoader from './expressLoader';
import mongooseLoader from './mongooseLoader';


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