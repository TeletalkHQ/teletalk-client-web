import { Box } from "~/components";
import { useUserStore } from "~/store";
import { UserId, VoidWithArg } from "~/types";

import ListItem from "./ListItem";

interface Props {
  onItemLick: VoidWithArg<UserId>;
}

const List: React.FC<Props> = ({ onItemLick }) => {
  const userStore = useUserStore();

  return (
    <Box.List>
      {userStore.users
        .filter((item) => item.isBlocked)
        .map((item, index) => (
          <ListItem
            onItemLick={() => onItemLick(item.userId)}
            key={index}
            userItem={item}
          />
        ))}
    </Box.List>
  );
};

export default List;
