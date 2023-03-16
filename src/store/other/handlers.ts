const handleStuffImported = (payload) => {
  return {
    isStuffImported: payload.isStuffImported,
  };
};

const otherReducerHandlers = { handleStuffImported };

export { otherReducerHandlers };
