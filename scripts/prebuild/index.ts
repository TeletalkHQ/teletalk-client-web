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
    .emit("getStuff", {}, (response: any) => {
      console.log("saving stuff...");

      const data = `
          export const stuff = ${JSON.stringify(response.data)} as const;
          `;

      fs.writeFileSync("./src/data/stuff.ts", data);

      console.log("done!");

      process.exit(0);
    });
};

run();
