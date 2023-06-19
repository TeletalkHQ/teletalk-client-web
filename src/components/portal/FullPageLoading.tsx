import MoonLoader from "react-spinners/MoonLoader";

import Box from "~/components/general/box";
import { LoadingState } from "~/types";

interface Props {
  loading: LoadingState;
}

const FullPageLoading: React.FC<Props> = ({ loading }) => {
  return (
    <>
      {loading.open && loading.type === "FULL_PAGE" && (
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
            color={loading.color}
            loading
            size={loading.size}
            speedMultiplier={loading.speedMultiplier}
          />
        </Box.Flex>
      )}
    </>
  );
};

export default FullPageLoading;
