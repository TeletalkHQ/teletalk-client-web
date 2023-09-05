import { maker } from "~/classes/Maker";
import { UserState } from "~/types";

export const initialState: UserState = {
  addingContactWithCellphone: maker.emptyAddingContactWithCellphone(),
  addingContactWithUserId: maker.emptyFullName(),
  currentUserData: {
    bio: "",
    countryCode: "",
    countryName: "",
    createdAt: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    status: {
      isActive: false,
    },
    userId: "",
    username: "",
  },
  selectedUserIdForActions: "",
  users: [],
};
