import { initialContact } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const tempInitialActions = {
	contactSelected: {
		type: "CONTACT_SELECTED",
		payload: { contact: initialContact },
	},
};

export { tempInitialActions };
