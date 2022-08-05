import { produce } from "immer";

const copyMan = ({ state, cb }) => produce(state, cb);

const mergePrevStateWithPayload = ({ state, payload }) => ({
  ...state,
  ...payload,
});

const actionCreator = (type, payload) => {
  return {
    type,
    payload,
  };
};

export { copyMan, mergePrevStateWithPayload, actionCreator };
