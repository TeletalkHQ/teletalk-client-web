import { ioFieldsChecker } from "utility-store/src/functions/ioFieldsChecker";
import { trier } from "utility-store/src/classes/Trier";

import { utilities } from "src/utilities";

import { commonTasks } from "src/classes/CommonTasks";
import { appConfigs } from "src/classes/AppConfigs";

import { store } from "src/store/store";

import { variables } from "src/variables";

const ioFieldsCheckerErrors = {
  ioDataFieldTypeWrongError:
    variables.notification.error.INPUT_FILED_TYPE_WRONG,
  ioDataNotDefinedError:
    variables.notification.error.INPUT_FIELDS_NOT_DEFINED_ERROR,
  missingFieldsError: variables.notification.error.INPUT_FIELDS_MISSING,
  overloadFieldsError: variables.notification.error.INPUT_FIELDS_OVERLOAD,
  requiredFieldsNotDefinedError:
    variables.notification.error.REQUIRED_FIELDS_NOT_DEFINED,
  requiredFieldTypeWrongError:
    variables.notification.error.REQUIRED_FIELD_TYPE_WRONG,
};

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

      utilities.errorThrower(checkResult.ok === false, checkResult.errorObject);
    }
  }
  tryToHandleAction() {
    this.checkPayload();
    const action = this.createAction();
    this.handleLogAction(action);
    return action;
  }

  catchTryToHandleAction(error) {
    this.logHandleError(error);

    //FIXME: Add specific action for this error
    // return this.createAction();
    return {};
  }
  handle() {
    return trier(`${ActionHandler.name}.${this.handle.name}`)
      .try(this.tryToHandleAction)
      .catch(this.catchTryToHandleAction)
      .result();
  }

  createAction() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }

  handleLogAction(action) {
    const canLogActions = appConfigs.getConfigs().stateManagement.logActions;
    commonTasks.checkAndExecute(canLogActions, () => this.logAction(action));
  }
  logAction(action) {
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
