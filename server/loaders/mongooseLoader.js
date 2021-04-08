import mongoose from 'mongoose';

export default () => {
    mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/gateway', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch(e => {
        console.error('Connection error', e.messsage);
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    return db;
}