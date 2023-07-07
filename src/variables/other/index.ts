import { ConnectionColors } from "~/types";
import { regex } from "~/variables/other/regex";

export const connectionColors: ConnectionColors = {
  idle: "white",
  offline: "red",
  online: "green",
  pending: "yellow",
};

const other = {
  connectionColors,
  regex,
};

export { other };
