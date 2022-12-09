import MoonLoader from "react-spinners/MoonLoader";

import CustomFlexBox from "src/components/general/box/CustomFlexBox";

import { stateStatics } from "src/store/stateStatics";

const FullPageLoading = ({ fullPageLoading }) => {
  return (
    <CustomFlexBox jc={"center"} ai={"center"} style={{ height: "100vh" }}>
      <MoonLoader
        color={fullPageLoading.color}
        loading={
          fullPageLoading.open &&
          fullPageLoading.type === stateStatics.GLOBAL_LOADING_TYPES.FULL_PAGE
        }
        size={fullPageLoading.size}
        speedMultiplier={fullPageLoading.speedMultiplier}
      />
    </CustomFlexBox>
  );
};

export default FullPageLoading;
