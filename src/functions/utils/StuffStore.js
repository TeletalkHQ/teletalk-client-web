function StuffStore() {
  this.templates = {
    routerTemplates: {
      privateChatRouterTemplate: {},
      cellphoneRouterTemplate: {},
      messageRouterTemplate: {},
      otherRouterTemplate: {},
      userRouterTemplate: {},
      versionControlRouterTemplate: {},
    },
    schemaTemplates: {
      chatSchemaTemplate: {},
      commonSchemaTemplate: {},
      userSchemaTemplate: {},
    },
    errorTemplates: {
      chatErrorTemplate: {},
      userErrorTemplate: {},
    },
  };
  this.schemas = {
    validationSchemas: {
      chatValidationSchemas: {},
      commonValidationSchemas: {},
      userValidationSchemas: {},
    },
  };
}

const Store = new StuffStore();

export { Store as StuffStore };
