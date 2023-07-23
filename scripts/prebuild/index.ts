import fs from "fs";
import io from "socket.io-client";

import { EventName } from "~/types";
import { evnLoader } from "~/utils/envLoader";

evnLoader();

const run = async () => {
  saveStuff();
};

const saveStuff = () => {
  io(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    autoConnect: false,
    withCredentials: true,
  })
    .connect()
    .emit<EventName>("getStuff", {}, (response: any) => {
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
