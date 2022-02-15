import { myConsole as console } from "~/Functions/Utils/myConsole";

declare global {
	var myConsole = console;
	var logger = console;
}
