import { produce } from "immer";

const copyMan = ({ state, cb }) => produce(state, cb);

const defaultDialogStateItemProps = () => ({
  open: false,
  //TODO: Move to appConfigs + read default value from mui
  props: { zIndex: 1300 },
});

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

export {
  actionCreator,
  copyMan,
  defaultDialogStateItemProps,
  mergePrevStateWithPayload,
};
