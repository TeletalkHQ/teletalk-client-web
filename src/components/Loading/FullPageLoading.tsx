import MoonLoader from "react-spinners/MoonLoader";

import { useGlobalStore } from "~/store";

import { Box } from "..";

const FullPageLoading = () => {
  const globalState = useGlobalStore();

  return (
    <>
      {globalState.loading.open && globalState.loading.type === "FULL_PAGE" && (
        <Box.Flex
          jc={"center"}
          ai={"center"}
          sx={(theme) => ({
            zIndex: theme.zIndex.tooltip + 1000,
            top: "0",
            left: "0",
            position: "absolute",
            backgroundColor: theme.palette.background.default,
            width: "100%",
            height: "100%",
          })}
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
