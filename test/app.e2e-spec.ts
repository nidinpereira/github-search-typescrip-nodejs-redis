// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require("supertest");

describe("GET unknown url", () => {

    let server;
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

    it("should return 404", (done) => {
        request(server).get("/random-invalid-url")
            .expect(404, done);
    });
});
