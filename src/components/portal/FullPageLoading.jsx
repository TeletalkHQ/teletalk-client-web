import MoonLoader from "react-spinners/MoonLoader";

import CustomFlexBox from "src/components/general/box/CustomFlexBox";

import { stateStatics } from "src/store/stateStatics";

const FullPageLoading = ({ loading }) => {
  return (
    loading.open &&
    loading.type === stateStatics.GLOBAL_LOADING_TYPES.FULL_PAGE && (
      <CustomFlexBox
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
      </CustomFlexBox>
    )
  );
};

export default FullPageLoading;
