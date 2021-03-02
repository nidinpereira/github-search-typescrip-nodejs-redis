import app from "./app";
import {SERVER_IP, SERVER_PORT} from "./config/config";

describe("Server.js", () => {
    let server;

    beforeAll(async () => {
        const mod = await import("../src/server");
        server = (mod as any).default;
    });

    afterAll(async (done)=> {
        server.close(done);
    });

    test("Server is able to read port", () => {
        expect(app.get("port")).toEqual(SERVER_PORT);
    });


    test("Server is able to read ip", () => {
        expect(app.get("serverIp")).toEqual(SERVER_IP);
    });

    test("Server is able to start gracefully", async () => {
        expect(server).not.toBeNull();
    });

});
