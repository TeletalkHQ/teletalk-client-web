import FullPageLoading from "components/portal/FullPageLoading";

import { useSelector } from "hooks/useThunkReducer";

const InitialSetup = () => {
  const state = useSelector();

  return <FullPageLoading fullPageLoading={state.global.fullPageLoading} />;
};

export default InitialSetup;
