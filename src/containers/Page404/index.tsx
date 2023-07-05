import { useRouter } from "next/router";

const Page404 = () => {
  const router = useRouter();
  router.push("/");
};

export default Page404;
