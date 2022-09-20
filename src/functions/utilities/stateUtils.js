import { produce } from "immer";

const copyMan = ({ state, cb }) => produce(state, cb);

//TODO: Should get removed
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
