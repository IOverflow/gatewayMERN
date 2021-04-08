import supertest from 'supertest';
import app from './setup';

app.listen(8001, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("READY on port 8000");
});
const request = supertest(app);

describe("Tests for DeviceController", () => {

    it("should fail to create a device with a gateway with more than 10 devices", async done => {
        const response = await request.post("/device/create").send({
            status: "online",
            uid: 123231,
            vendor: "SomeVendor",
            date: new Date(),
            gateway: 1
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Gateway can not take more devices.");
        done();
    });
    
})