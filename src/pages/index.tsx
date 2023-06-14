import { useEffect } from "react";
import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["firstCache"],
    queryFn: async () => {
      return {
        firstCache: "YAY!",
      };
    },
    placeholderData: { firstCache: "" },
  });
  console.log(data);

  const router = useRouter();

  useEffect(() => {
    async function fn() {
      fetch("http://localhost:8090/setClientId", {
        method: "GET",
        credentials: "include",
      });

      router.push("signIn");
    }

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Hallo!</div>;
}
