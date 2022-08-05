import { userPropsUtilities } from "classes/UserPropsUtilities";

class DataUsageManager {
  constructor() {
    this.usedCellphone = [];
  }

  addUsedCellphone(cellphone) {
    this.usedCellphone.push(cellphone);

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
