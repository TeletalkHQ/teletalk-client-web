import MoonLoader from "react-spinners/MoonLoader";

import CustomFlexBox from "src/components/general/box/CustomFlexBox";

import { stateStatics } from "src/store/stateStatics";

const FullPageLoading = ({ globalLoading }) => {
  return (
    globalLoading.open &&
    globalLoading.type === stateStatics.GLOBAL_LOADING_TYPES.FULL_PAGE && (
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
          color={globalLoading.color}
          loading
          size={globalLoading.size}
          speedMultiplier={globalLoading.speedMultiplier}
        />
      </CustomFlexBox>
    )
  );
};

export default FullPageLoading;
