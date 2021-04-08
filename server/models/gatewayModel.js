import {
    model,
    Schema
} from "mongoose";


const GatewaySchema = new Schema({
    serialNumber: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    ipv4: {
        type: String,
        required: true,
        // Check that ip is in range 0.0.0.0 - 255.255.255.255
        // Is allowed something like 000.1.9.02 and will be interpreted as 0.1.9.2
        match: /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    },

    // Define a one-to-many relationship with Device
    devices: [{
        type: Schema.Types.ObjectId,
        ref: "Device"
    }]
});

const GatewayModel = model("Gateway", GatewaySchema);

export default GatewayModel;