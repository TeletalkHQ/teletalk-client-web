import FullPageLoading from "components/portal/FullPageLoading";

import { useMainContext } from "hooks/useMainContext";

const InitialSetup = () => {
  const { state } = useMainContext();

  return <FullPageLoading fullPageLoading={state.global.fullPageLoading} />;
};

export default InitialSetup;
