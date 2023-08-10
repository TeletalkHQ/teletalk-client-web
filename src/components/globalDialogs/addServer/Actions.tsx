import { Input } from "~/components";
import CloseButton from "~/components/common/CloseButton";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddDisabled: boolean;
  isCloseDisabled: boolean;
  isTestDisabled: boolean;
  loading: boolean;
  onAddClick: VoidNoArgsFn;
  onClose: VoidNoArgsFn;
  onTestClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
  isAddDisabled,
  isCloseDisabled,
  isTestDisabled,
  loading,
  onAddClick,
  onClose,
  onTestClick,
}) => {
  return (
    <>
      <CloseButton disabled={isCloseDisabled} onClick={onClose} />
      <Input.PrimaryButton
        disabled={isTestDisabled}
        loading={loading}
        loadingIndicatorText="Testing..."
        onClick={onTestClick}
      >
        Test
      </Input.PrimaryButton>

      <Input.PrimaryButton
        disabled={isAddDisabled}
        loadingIndicatorText="Adding..."
        onClick={onAddClick}
      >
        Add
      </Input.PrimaryButton>
    </>
  );
};

export default Actions;
