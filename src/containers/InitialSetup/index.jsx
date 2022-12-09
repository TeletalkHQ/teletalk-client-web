import FullPageLoading from "src/components/portal/FullPageLoading";

import { useSelector } from "src/hooks/useThunkReducer";

const InitialSetup = () => {
  const state = useSelector();

  return <FullPageLoading fullPageLoading={state.global.fullPageLoading} />;
};

export default InitialSetup;
