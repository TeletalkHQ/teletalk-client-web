import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import MoonLoader from "react-spinners/MoonLoader";
import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/constants";

const FullPageLoading = ({ globalLoadingState }) => {
  return (
    <CustomFlexBox jc={"center"} ai={"center"} style={{ height: "100vh" }}>
      <MoonLoader
        color={globalLoadingState.color}
        loading={
          globalLoadingState.open &&
          globalLoadingState.type === GLOBAL_LOADING_TYPES.FULL_PAGE
        }
        size={globalLoadingState.size}
        speedMultiplier={globalLoadingState.speedMultiplier}
      />
    </CustomFlexBox>
  );
};

export default FullPageLoading;
