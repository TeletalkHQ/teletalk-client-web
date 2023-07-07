import { Status } from "~/types";

export interface ServerListItem {
  url: string;
  ping: number | undefined;
  status: Status;
}
