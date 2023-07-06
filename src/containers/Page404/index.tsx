import { useRouter } from "next/router";
import { useEffect } from "react";

const Page404Container = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Page404Container;
