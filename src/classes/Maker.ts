import { Maker as MakerMain } from "utility-store";
import {
  ExtendedFullName,
  FullNameWithUserId,
  PublicUserData,
} from "utility-store/lib/types";

import { UserItem } from "~/types";

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

  emptyUser(): UserItem {
    return {
      ...this.emptyUserPublicData(),
      ...this.emptyCellphone(),
      isContact: false,
      originalFirstName: "",
      originalLastName: "",
    };
  }

  user(publicData: PublicUserData, userItem?: UserItem): UserItem {
    return {
      ...this.emptyUser(),
      ...publicData,
      ...(userItem || {}),
      ...this.originalFullName(publicData),
    };
  }

  originalFullName(d: Partial<ExtendedFullName>) {
    return {
      originalFirstName: d.firstName || "",
      originalLastName: d.lastName || "",
    };
  }
}

export const maker = new Maker();
