import { errorThrower } from "utility-store/src/functions/utilities";

import { componentController } from "classes/ComponentController";

import { variables } from "variables";

class ComponentBuilder {
  constructor() {
    this.component = undefined;
    this.componentName = "";
  }
  setComponent(component, componentName) {
    this.component = component;

    errorThrower(
      !componentName,
      variables.notification.error.COMPONENT_NAME_REQUIRED
    );

    this.componentName = componentName;
  }

  build() {
    return (props) => {
      componentController.incRender(this.componentName);

      return this.component(props);
    };
  }
}

const componentBuilder = { create: () => new ComponentBuilder() };

export { componentBuilder, ComponentBuilder };
