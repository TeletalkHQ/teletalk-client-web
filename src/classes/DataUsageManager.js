import { isDataHasEqualityWithTargetCellphone } from "functions/utilities/utilities";

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
      isDataHasEqualityWithTargetCellphone(c, cellphone)
    );
  }
}

const dataUsageManager = new DataUsageManager();

export { DataUsageManager, dataUsageManager };
