import { Logger as ConsoleLogger } from "~/Functions/Utils/Logger";

declare global {
	var logger = ConsoleLogger;
}
