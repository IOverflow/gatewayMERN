import supertest from 'supertest';
import app from './setup';

app.listen(8004, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("READY on port 8000");
});
const request = supertest(app);

describe('Test for GatewayController', () => {
    it('should create a new Gateway', async done => {
        const response = await request.post("/gateway/create").send({
            name: "NewName",
            ipv4: "127.0.0.1",
            serialNumber: "12312312321",
            devices: [ 1, 2, 3 ]
        });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id');
        done();
    });

    it('should get details of gateway', async done => {
        const response = await request.get('/gateway/details/1');
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.devices[ 0 ]).toHaveProperty('status');
        done();
    });
})