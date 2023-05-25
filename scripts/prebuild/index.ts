import { websocket } from "~/classes/websocket/Websocket";

console.log("Hallo!");

const fn = async () => console.log("Hallo!!!");

await fn();

websocket.client.connect();
