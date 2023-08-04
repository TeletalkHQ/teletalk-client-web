import { Maker as MakerMain } from "utility-store";
import { FullNameWithUserId, PublicUserData } from "utility-store/lib/types";

export class Maker extends MakerMain {
  //@ts-ignore
  emptyContact() {
    return {
      ...super.emptyContact(),
      isContact: false,
      userId: "",
    };
  }

  emptyContactWithCellphone() {
    return {
      ...super.emptyCellphone(),
      ...super.emptyFullName(),
    };
  }

  emptyUserPublicData(): PublicUserData {
    return {
      ...super.emptyFullName(),
      bio: "",
      userId: "",
      username: "",
    };
  }

  emptyContactWithUserId(): FullNameWithUserId {
    return {
      ...super.emptyFullName(),
      userId: "",
    };
  }
}

export const maker = new Maker();
