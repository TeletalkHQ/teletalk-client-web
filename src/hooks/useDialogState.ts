import { useGlobalStore } from "~/store";
import { DialogName, DialogProps } from "~/types";

export const useDialogState = (
  d: DialogName
): {
  open: boolean;
  props: DialogProps;
} => {
  const globalStore = useGlobalStore();

  const ds = globalStore.dialogStates.at(-1);

  return ds?.name === d
    ? {
        ...ds,
        open: true,
      }
    : {
        open: false,
        props: {
          zIndex: 1300,
        },
      };
};
