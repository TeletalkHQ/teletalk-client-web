import Box from "~/components/general/box";
import StatusIndicator from "~/components/other/StatusIndicator";
import { Url } from "~/types";

import { ServerListItem } from "./types";

interface Props {
  list: ServerListItem[];
  onListItemClick: (url: Url) => Promise<void>;
}

const Content: React.FC<Props> = ({ list, onListItemClick }) => {
  return (
    <Box.List>
      {list.map((item, index) => {
        return (
          <Box.ListItemButton
            onClick={() => onListItemClick(item.url)}
            style={{ borderRadius: "10px" }}
            key={index}
          >
            <Box.ListItemText>{item.url}</Box.ListItemText>
            <Box.ListItemText style={{ textAlign: "end" }}>
              <Box.Span>
                <StatusIndicator status={item.status} />
              </Box.Span>

              <Box.Span>{item.status}</Box.Span>
            </Box.ListItemText>
          </Box.ListItemButton>
        );
      })}
    </Box.List>
  );
};

export default Content;
