import app from "./app";


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), app.get("serverIp"), () => {
    console.log(
        `Server is running at http://${app.get("serverIp")}:${app.get("port")} in ${app.get("env")} mode`
    );
    console.log("  Press CTRL-C to stop\n");
});



export default server;
