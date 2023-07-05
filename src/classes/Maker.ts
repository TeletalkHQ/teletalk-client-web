import { Maker as MakerMain } from "utility-store";

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
}

export const maker = new Maker();
