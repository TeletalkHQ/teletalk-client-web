import { useState } from "react";

import Box from "~/components/general/box";
import IconButton from "~/components/general/other/IconButton";
import { Icons } from "~/components/other/Icons";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";

const ChatBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userStore = useUserStore();
  const messageStore = useMessageStore();
  const globalStore = useGlobalStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToContacts = () => {
    globalStore.openDialog("addContactWithUserId");
  };

  const handleRemoveFromContacts = () => {
    const userItem = userStore.users.find(
      (i) => i.userId === messageStore.selectedChatInfo.userId
    )!;

    userStore.setSelectedContactFromContext(userItem);
    globalStore.openDialog("removeContact");
  };

  const { isContact } = userStore.users.find(
    (i) => i.userId === messageStore.selectedChatInfo.userId
  ) || { isContact: false };

  const isOpen = !!anchorEl;

  return (
    <Box.Div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={isOpen ? "long-menu" : undefined}
        aria-expanded={isOpen ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icons.MoreVertical.Icon />
      </IconButton>
      <Box.Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        {[
          {
            label: isContact ? "Remove from contacts" : "Add to contacts",
            onClick: isContact ? handleRemoveFromContacts : handleAddToContacts,
          },
        ].map((option, index) => (
          <Box.MenuItem
            key={index}
            onClick={() => {
              handleClose();
              option.onClick();
            }}
          >
            {option.label}
          </Box.MenuItem>
        ))}
      </Box.Menu>
    </Box.Div>
  );
};

export default ChatBarMenu;
