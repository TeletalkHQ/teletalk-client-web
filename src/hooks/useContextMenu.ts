import { useGlobalStore } from "~/store";
import { ContextMenuList } from "~/types";

export const useContextMenu = (list: ContextMenuList) => {
  const globalStore = useGlobalStore();

  const handleOpenContextMenu = (e: React.MouseEvent) => {
    globalStore.handleContextMenu(e, list);
  };

  return {
    onContextMenu: handleOpenContextMenu,
  };
};
