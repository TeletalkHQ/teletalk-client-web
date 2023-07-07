import MoonLoader from "react-spinners/MoonLoader";

import Box from "~/components/general/box";
import { useGlobalStore } from "~/store";

const FullPageLoading = () => {
  const globalState = useGlobalStore();

  return (
    <>
      {globalState.loading.open && globalState.loading.type === "FULL_PAGE" && (
        <Box.Flex
          jc={"center"}
          ai={"center"}
          style={{
            //TODO: Read from mui
            zIndex: 1000,
            top: "0",
            left: "0",
            position: "absolute",
            backgroundColor: "#ffffff",
            width: "100%",
            height: "100%",
          }}
        >
          <MoonLoader
            color={globalState.loading.color}
            loading
            size={globalState.loading.size}
            speedMultiplier={globalState.loading.speedMultiplier}
          />
        </Box.Flex>
      )}
    </>
  );
};

export default FullPageLoading;
