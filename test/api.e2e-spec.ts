// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require("supertest");
import moment from "moment";

describe("POST /api/search", () =>{
    let server;
    let responseTime = 0;
    let cachedResponseTime = 0;
    beforeAll(async () => {
        const mod = await import("../src/server");
        server = (mod as any).default;
    });
    afterAll(async (done) => {
        if (server) {
            server.close();
        }
        done();
    });

    it("should return 200 and with user object when type is user", async () => {
        const timeBeforeRequest: moment.Moment = moment();
        const response = await request(server)
            .post("/api/search")
            .send({
                "type": "user",
                "searchText": "mark"
            });
        const timeAfterRequest: moment.Moment = moment();

        responseTime = timeAfterRequest.diff( timeBeforeRequest);
        console.log(responseTime);

        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    });

    it("should return 200 respond faster when called with same params", async () => {
        const timeBeforeRequest: moment.Moment = moment();
        const response = await request(server)
            .post("/api/search")
            .send({
                "type": "user",
                "searchText": "mark"
            });
        const timeAfterRequest: moment.Moment = moment();
        cachedResponseTime = timeAfterRequest.diff( timeBeforeRequest);
        expect(response.status).toBe(200);
        expect(cachedResponseTime).toBeLessThan(responseTime);
    });


    it("should return 200 when clearing cache", async () => {
        const response = await request(server)
            .post("/api/clear-cache")
            .send({});
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"status": "success"});
    });

    it("should return 200 respond slower than cached timing", async () => {
        const timeBeforeRequest: moment.Moment = moment();
        const response = await request(server)
            .post("/api/search")
            .send({
                "type": "user",
                "searchText": "mark"
            });
        const timeAfterRequest: moment.Moment = moment();
        const newResponseTime = timeAfterRequest.diff(timeBeforeRequest);
        expect(response.status).toBe(200);
        expect(newResponseTime).toBeGreaterThan(cachedResponseTime);
    });


    it("should return 200 and with repo object when type is repo", async () => {
        const response = await request(server)
            .post("/api/search")
            .send({
                "type": "repo",
                "searchText": "react"
            });
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    });

    it("should return 200 and with issue object when type is issue", async () => {
        const response = await request(server)
            .post("/api/search")
            .send({
                "type": "issue",
                "searchText": "nestjs"
            });
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    });

});
