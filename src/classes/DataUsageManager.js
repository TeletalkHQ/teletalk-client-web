import { userPropsUtilities } from "classes/UserPropsUtilities";
import { arrayUtilities } from "classes/ArrayUtilities";

//? Useful for test stuffs
class DataUsageManager {
  constructor() {
    this.usedCellphone = [];
  }

  addUsedCellphone(cellphone) {
    this.usedCellphone = arrayUtilities.pushNewItems(
      this.usedCellphone,
      cellphone
    );

    return this;
  }

  isCellphoneUsedBefore(cellphone) {
    return this.usedCellphone.some((c) =>
      userPropsUtilities.isDataHasEqualityWithTargetCellphone(c, cellphone)
    );
  }
}

const dataUsageManager = new DataUsageManager();

export { DataUsageManager, dataUsageManager };
