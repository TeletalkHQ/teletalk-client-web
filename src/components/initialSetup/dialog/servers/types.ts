import { Status, Url } from "~/types";

export interface ServerListItem {
  url: Url;
  ping: number | undefined;
  status: Status;
}
