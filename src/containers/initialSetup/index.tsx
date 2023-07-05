import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import Box from "~/components/general/box";
import LoadingButton from "~/components/general/input/LoadingButton";
import CircularProgress from "~/components/general/progress/CircularProgress";
import { useUserStore } from "~/store";
import { GetUserDataIO } from "~/types";

const InitialSetup = () => {
  const userStore = useUserStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    handleUpdateUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserData = () => {
    setLoading(true);

    socketEmitterStore.events.getUserData.emitFull<GetUserDataIO>(
      {},
      async ({ data }) => {
        userStore.setUserData(data.user);
        router.push("/messenger");

        return data;
      },
      (errors) => {
        if (errors.some((i) => i.isAuthError)) router.push("/signIn");

        setLoading(false);
      }
    );
  };

  return (
    <>
      <Box.Div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box.Div
          style={{
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            display: "flex",
            maxWidth: "400px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoadingButton
            loading={loading}
            onClick={handleUpdateUserData}
            style={{
              textAlign: "center",
            }}
            loadingIndicator={
              <Box.Span>
                <Box.Span>{"Setting up..."}</Box.Span>
                <CircularProgress
                  style={{ marginLeft: 10 }}
                  size={20}
                  color="info"
                />
              </Box.Span>
            }
          >
            Try again!
          </LoadingButton>
        </Box.Div>
      </Box.Div>
    </>
  );
};

export default InitialSetup;
