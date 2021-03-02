import app from "./app";
import setRoutes from "./app.router";
import {SERVER_IP, SERVER_PORT} from "./config/config";

describe("App.ts", () => {

    test("app is able to set and get port", () => {
        app.set("port", SERVER_PORT);
        expect(app.get("port")).toEqual(SERVER_PORT);
    });


    test("app is able to set and get ip", () => {
        app.set("serverIp", SERVER_IP);
        expect(app.get("serverIp")).toEqual(SERVER_IP);
    });

    test("app is able to set routes", async () => {
        setRoutes(app);
    });

});
