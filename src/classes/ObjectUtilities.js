import { customTypeof } from "classes/CustomTypeof";

class ObjectUtilities {
  objectKeys(object) {
    return Object.keys(object);
  }

  objectKeysLength(object) {
    return Object.keys(object).length;
  }

  objectEntries(object) {
    return Object.entries(object);
  }

  objectClarify(dirtyObject = {}) {
    const cleanObject = {};

    this.objectEntries(dirtyObject)?.forEach(([key, value]) => {
      if (!customTypeof.check(value).type.undefined) {
        if (customTypeof.check(dirtyObject[key]).type.object) {
          cleanObject[key] = this.objectClarify(dirtyObject[key]);

          return;
        }

        cleanObject[key] = value;
      }
    });

    return cleanObject;
  }

  filterObjectByFilterFields(object, filterFields) {
    const filteredObject = {};

    for (const key in filterFields) {
      if (customTypeof.check(filterFields[key]).type.object) {
        filteredObject[key] = this.filterObjectByFilterFields(
          object[key],
          filterFields[key]
        );
        continue;
      }

      filteredObject[key] = object[key];
    }

    return filteredObject;
  }

  renameObjectKey(object, oldKey, newKey) {
    const copyOfObject = { ...object };
    if (oldKey !== newKey) {
      copyOfObject[newKey] = copyOfObject[oldKey];
      delete copyOfObject[oldKey];
    }

    return copyOfObject;
  }

  setPropertyByFirstTruthyValue(object, key, ...values) {
    const truthyValue = values.find((item) => item);

    return {
      ...object,
      [key]: truthyValue,
    };
  }

  objectValues(object) {
    return Object.values(object);
  }

  freezeObject(object) {
    const copyOfObject = this.objectShallowCopy(object);
    return Object.freeze(copyOfObject);
  }

  objectShallowCopy(object) {
    return { ...object };
  }

  objectInitializer(arrayOfValues, props) {
    try {
      const tempObj = {};

      props.forEach((prop, index) => {
        tempObj[prop] = arrayOfValues[index];
      });

      return tempObj;
    } catch (error) {
      logger.log("objectInitializer catch, error:", error);
    }
  }
}

const objectUtilities = new ObjectUtilities();

export { objectUtilities, ObjectUtilities };
