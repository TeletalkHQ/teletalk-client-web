import { ioFieldsChecker } from "utility-store/src/functions/ioFieldsChecker";

import { utilities } from "utilities";

import { commonTasks } from "classes/CommonTasks";
import { appConfigs } from "classes/AppConfigs";

import { store } from "store/store";

import { variables } from "variables";

const payloads = {
  ...store.payloads.auth,
  ...store.payloads.global,
  ...store.payloads.message,
  ...store.payloads.notification,
  ...store.payloads.other,
  ...store.payloads.user,
};

class ActionHandler {
  constructor(type, payload) {
    this.payload = payload;
    this.type = type;
    this.payloadModel = payloads[this.type];
  }

  handle() {
    try {
      if (this.payloadModel) {
        const checkResult = ioFieldsChecker(this.payload, this.payloadModel, {
          ioDataFieldTypeWrongError:
            variables.notification.error.INPUT_FILED_TYPE_WRONG,
          ioDataNotDefinedError:
            variables.notification.error.INPUT_FIELDS_NOT_DEFINED_ERROR,
          missingFieldsError: variables.notification.error.INPUT_FIELDS_MISSING,
          overloadFieldsError:
            variables.notification.error.INPUT_FIELDS_OVERLOAD,
          requiredFieldsNotDefinedError:
            variables.notification.error.REQUIRED_FIELDS_NOT_DEFINED,
          requiredFieldTypeWrongError:
            variables.notification.error.REQUIRED_FIELD_TYPE_WRONG,
        });

        utilities.errorThrower(
          checkResult.ok === false,
          checkResult.errorObject
        );
      } else {
        //FIXME: Throw error if no payload model found
      }

      const action = this.createAction();
      this.logAction(action);
      return action;
    } catch (error) {
      console.log(error);
      console.log("type:", this.type);
      console.log(
        "payloadModel:",
        Object.keys(this.payloadModel).length,
        this.payloadModel
      );
      console.log("payload:", Object.keys(this.payload).length, this.payload);
      //FIXME: Add specific action for this error
      // return this.createAction();
      // throw error;
      return {};
    }
  }

  createAction() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }

  logAction(action) {
    commonTasks.checkAndExecute(
      appConfigs.getConfigs().stateManagement.logActions,
      () => logger.debug(action)
    );
  }
}

const actionHandler = (type, payload) =>
  new ActionHandler(type, payload).handle();

export { ActionHandler, actionHandler };
