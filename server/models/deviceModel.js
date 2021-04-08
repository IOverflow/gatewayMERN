import {
    model,
    Schema
} from "mongoose";

const DeviceSchema = new Schema({
    uid: Number,

    vendor: String,

    date: Date,

    status: {
        type: String,
        enum: ["online", "offline"]
    },

    // Direct reference to a related Gateway
    gateway: {
        type: Schema.Types.ObjectId,
        ref: "Gateway"
    }
});

const DeviceModel = model("Device", DeviceSchema);

export default DeviceModel;