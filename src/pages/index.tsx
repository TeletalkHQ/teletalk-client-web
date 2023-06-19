import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
