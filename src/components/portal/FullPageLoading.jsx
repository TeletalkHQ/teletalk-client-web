import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import MoonLoader from "react-spinners/MoonLoader";
import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/helpers";

const FullPageLoading = ({ loading }) => {
  return (
    <CustomFlexBox jc={"center"} ai={"center"} style={{ height: "100vh" }}>
      <MoonLoader
        color={loading.color}
        loading={
          loading.open && loading.type === GLOBAL_LOADING_TYPES.FULL_PAGE
        }
        size={loading.size}
        speedMultiplier={loading.speedMultiplier}
      />
    </CustomFlexBox>
  );
};

export default FullPageLoading;
