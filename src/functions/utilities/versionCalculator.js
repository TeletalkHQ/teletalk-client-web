import { arrayUtilities } from "classes/ArrayUtilities";

const versionCalculator = (versions = []) => {
  let [parentMajor, parentMinor, parentPatch] =
    arrayUtilities.convertStringArrayToNumberArray("1.0.0".split("."));

  versions.forEach((v) => {
    const [major, minor, patch] =
      arrayUtilities.convertStringArrayToNumberArray(v.split("."));

    parentMajor += major - 1;
    parentMinor += minor;
    parentPatch += patch;
  });

  return `${parentMajor}.${parentMinor}.${parentPatch}`;
};

export { versionCalculator };
