let extractedDispatch = () => {};

const assignDispatch = (dispatch) => {
  extractedDispatch = dispatch;
};

export { assignDispatch, extractedDispatch };
