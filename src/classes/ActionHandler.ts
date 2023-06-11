import { errorThrower, ioFieldsChecker } from "utility-store";
import { trier } from "simple-trier";

import { utilities } from "~/utilities";

import { commonTasks } from "~/classes/CommonTasks";
import { appConfigs } from "~/classes/AppConfigs";

import { payloads } from "~/store/store";

import { variables } from "~/variables";

const ioFieldsCheckerErrors = {
  ioDataFieldTypeWrongError:
    variables.notification.errors.INPUT_FILED_TYPE_WRONG,
  ioDataNotDefinedError:
    variables.notification.errors.INPUT_FIELDS_NOT_DEFINED_ERROR,
  missingFieldsError: variables.notification.errors.INPUT_FIELDS_MISSING,
  overloadFieldsError: variables.notification.errors.INPUT_FIELDS_OVERLOAD,
  requiredFieldsNotDefinedError:
    variables.notification.errors.REQUIRED_FIELDS_NOT_DEFINED,
  requiredFieldTypeWrongError:
    variables.notification.errors.REQUIRED_FIELD_TYPE_WRONG,
};

const allPayloads = {
  ...payloads.auth,
  ...payloads.global,
  ...payloads.message,
  ...payloads.notification,
  ...payloads.other,
  ...payloads.user,
};

class ActionHandler {
  constructor(type, payload) {
    this.payload = payload;
    this.type = type;
    this.payloadModel = allPayloads[this.type];

    this.catchTryToHandleAction = this.catchTryToHandleAction.bind(this);
    this.tryToHandleAction = this.tryToHandleAction.bind(this);
  }

  checkPayload() {
    if (this.payloadModel) {
      const checkResult = ioFieldsChecker(
        this.payload,
        this.payloadModel,
        ioFieldsCheckerErrors
      );

      errorThrower(checkResult.ok === false, {
        ...checkResult.error,
        type: this.type,
      });
    }
  }
  tryToHandleAction() {
    this.checkPayload();
    const action = this.createAction();
    this.logAction(action);
    return action;
  }

  catchTryToHandleAction(error) {
    this.logHandleError(error);

    //FIXME: type for internal application error
    return { type: "error" };
  }
  handle() {
    return trier(`${ActionHandler.name}.${this.handle.name}`)
      .try(this.tryToHandleAction)
      .catch(this.catchTryToHandleAction)
      .run();
  }

  createAction() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }

  logAction(action) {
    if (appConfigs.getConfigs().stateManagement.shouldLogActions)
      logger.debug(action);
  }

  logHandleError(error) {
    logger.debug(
      "error:",
      error,
      "\ntype:",
      this.type,
      "\npayloadModel:",
      this.payloadModel,
      "\npayload:",
      this.payload
    );
  }
}

const actionHandler = (type, payload) =>
  new ActionHandler(type, payload).handle();

export { ActionHandler, actionHandler };
