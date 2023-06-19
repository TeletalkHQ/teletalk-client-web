import { Field, NativeModelKey } from "~/types";
import { otherUtilities } from "~/utilities/other";
import { errors } from "~/variables/notification/error";

const findError = <M extends NativeModelKey>(
  fieldName: Field,
  modelKeyName: M
) => {
  return errors[makeModelErrorReason(fieldName, modelKeyName) as ErrorReason];
};

const makeModelErrorReason = (
  fieldName: Field,
  modelKeyName: NativeModelKey
) => {
  return `${fieldName}_${modelKeyName}_error` as ModelErrorReason;
};

const utilities = {
  ...otherUtilities,
  findError,
};

export { utilities };
