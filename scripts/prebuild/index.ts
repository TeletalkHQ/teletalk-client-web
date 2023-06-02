import fs from "fs";
import io from "socket.io-client";

const run = async () => {
  saveStuff();
};

const saveStuff = () => {
  io("http://localhost:8090", {
    autoConnect: false,
    withCredentials: true,
  })
    .connect()
    .emit("getStuff", undefined, (response: any) => {
      console.log("saving stuff...");

      fs.writeFileSync("./src/data/stuff.json", JSON.stringify(response.data));

      console.log("done!");

      process.exit(0);
    });
};

run();
