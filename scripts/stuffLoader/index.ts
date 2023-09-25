import { evnLoader } from "configs/env/envLoader";
import fs from "fs";
import io from "socket.io-client";

import { EventName } from "~/types";

evnLoader();

const saveStuff = () => {
  console.log("starting...");

  io(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    autoConnect: false,
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

saveStuff();
