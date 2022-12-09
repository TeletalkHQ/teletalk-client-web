import { ioFieldsChecker } from "utility-store/src/functions/ioFieldsChecker";

import { utilities } from "src/utilities";

import { commonTasks } from "src/classes/CommonTasks";
import { appConfigs } from "src/classes/AppConfigs";

import { store } from "src/store/store";

import { variables } from "src/variables";

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
      logger.debug(error);
      logger.debug("type:", this.type);
      logger.debug(
        "payloadModel:",
        Object.keys(this.payloadModel).length,
        this.payloadModel
      );
      logger.debug("payload:", Object.keys(this.payload).length, this.payload);
      //FIXME: Add specific action for this error
      // return this.createAction();
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
