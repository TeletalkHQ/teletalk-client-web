import { errorThrower } from "utility-store";

import { componentController } from "~/classes/ComponentController";
import { variables } from "~/variables";

class ComponentBuilder {
  constructor() {
    this.component = undefined;
    this.componentName = "";
  }
  setComponent(componentName, component) {
    this.component = component;

    errorThrower(
      !componentName,
      variables.notification.errors.COMPONENT_NAME_REQUIRED
    );

    this.componentName = componentName;

    return this;
  }

  registerComponent(componentName, component) {
    this.setComponent(componentName, component);
    componentController.registerComponent(componentName);
    return this;
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
