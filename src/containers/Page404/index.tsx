import { useEffect } from "react";

import { useCustomRouter } from "~/hooks/useCustomRouter";

const Page404Container = () => {
  const router = useCustomRouter();

  useEffect(() => {
    router.push("initialSetup");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Page404Container;
