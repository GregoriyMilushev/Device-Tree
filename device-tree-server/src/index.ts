
import * as dotenv from "dotenv";
import WSFactory from "./Factories/WSFactory";

dotenv.config();

const websocketPort: number = Number(process.env.WEBSOCKET_PORT);

const WSServer = new WSFactory();
WSServer.createServerOn(websocketPort).start();