import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";
import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

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

const extractVersions = (object) => {
  return objectUtilities.objectKeys(object).map((key) => object[key].version);
};

const excludeVersion = (object) => {
  const tempObject = {};

  for (const key in object) {
    const { version, ...childObject } = object[key];

    tempObject[key] = childObject;
  }

  return tempObject;
};

const versionUtilities = { excludeVersion, extractVersions, versionCalculator };

export { versionUtilities };
