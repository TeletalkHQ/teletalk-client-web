class ComponentController {
  constructor() {
    this.components = {
      // componentName: {
      // renderCount: Number
      // }
    };
  }

  registerComponent(componentName) {
    this.components[componentName] = {
      renderCount: 0,
    };
  }

  getComponent(componentName) {
    return this.components[componentName];
  }

  incRender(componentName) {
    const component = this.getComponent(componentName);
    ++component.renderCount;
    return this;
  }
}

const componentController = new ComponentController();

export { componentController, ComponentController };
