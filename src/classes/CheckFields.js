import { errorThrower } from "functions/utilities/otherUtilities";
import { customTypeof } from "utility-store/src/classes/CustomTypeof";
import { notifications } from "variables/otherVariables/notifications";
import { objectUtilities } from "./ObjectUtilities";

const { REQUIRED_IO_FIELD_IS_NOT_ARRAY, REQUIRED_IO_FIELD_IS_NOT_OBJECT } =
  notifications;

class CheckFields {
  constructor(ioData, requiredFields, missingFieldsError, overloadFieldsError) {
    this.ioData = this.filterIoDataOptionalFields(ioData, requiredFields);
    this.requiredFields =
      this.filterRequiredFieldsOptionalFields(requiredFields);
    this.missingFieldsError = missingFieldsError;
    this.overloadFieldsError = overloadFieldsError;
  }

  isRequiredFieldOptional(requiredField) {
    if (customTypeof.isBoolean(requiredField) && requiredField) return true;

    return false;
  }

  filterIoDataOptionalFields(ioData, requiredFields) {
    const tempIoData = {};

    for (const key in ioData) {
      const ioFieldValue = ioData[key];
      const requiredField = requiredFields[key];
      if (this.isRequiredFieldOptional(requiredField)) continue;
      tempIoData[key] = ioFieldValue;
    }

    return tempIoData;
  }

  filterRequiredFieldsOptionalFields(requiredFields) {
    const tempRequiredFields = {};

    for (const key in requiredFields) {
      const requiredFieldValue = requiredFields[key];
      if (this.isRequiredFieldOptional(requiredFieldValue)) continue;
      tempRequiredFields[key] = requiredFieldValue;
    }

    return tempRequiredFields;
  }

  check() {
    this.throwErrorIfIoDataAndRequiredFieldsLengthNotMatch();
    this.checkRequiredFields();
    return { done: true };
  }

  throwErrorIfIoDataAndRequiredFieldsLengthNotMatch() {
    const ioFieldsLength = objectUtilities.objectKeysLength(this.ioData);
    const requiredFieldsLength = objectUtilities.objectKeysLength(
      this.requiredFields
    );

    if (ioFieldsLength !== requiredFieldsLength) {
      errorThrower(
        ioFieldsLength < requiredFieldsLength,
        this.missingFieldsError
      );

      throw this.overloadFieldsError;
    }
  }

  checkRequiredFields() {
    for (const key in this.requiredFields) {
      const ioField = this.ioData[key];
      const requiredField = this.requiredFields[key];

      this.throwErrorIfIoFieldIsUndefined(ioField);

      if (customTypeof.check(requiredField).type.isObject) {
        this.checkObjectFields(ioField, requiredField);
      } else if (customTypeof.check(requiredField).type.isArray) {
        this.checkArrayFields(ioField, requiredField[0]);
      }
    }
  }

  checkObjectFields(ioField, requiredField) {
    this.throwErrorIfIoFieldIsNotObject(ioField);

    checkFields(
      ioField,
      requiredField,
      this.missingFieldsError,
      this.overloadFieldsError
    ).check();
  }
  throwErrorIfIoFieldIsNotObject(ioField) {
    errorThrower(
      !customTypeof.check(ioField).type.isObject,
      REQUIRED_IO_FIELD_IS_NOT_OBJECT
    );
  }

  throwErrorIfIoFieldIsUndefined(ioField) {
    errorThrower(
      customTypeof.check(ioField).type.isUndefined,
      this.missingFieldsError
    );
  }

  checkArrayFields(ioField, requiredField) {
    this.throwErrorIfIoFieldIsNotArray(ioField);

    ioField.forEach((item) => {
      checkFields(
        item,
        requiredField,
        this.missingFieldsError,
        this.overloadFieldsError
      ).check();
    });
  }
  throwErrorIfIoFieldIsNotArray(ioField) {
    errorThrower(
      !customTypeof.check(ioField).type.isArray,
      REQUIRED_IO_FIELD_IS_NOT_ARRAY
    );
  }
}

const checkFields = (...args) => new CheckFields(...args);

export { CheckFields, checkFields };
