import { Box, Components } from "~/components";
import { ServerTestResult, Url } from "~/types";

interface Props {
  disabled: boolean;
  list: ServerTestResult[];
  onListItemClick: (url: Url) => Promise<void>;
}

const Content: React.FC<Props> = ({ list, onListItemClick, disabled }) => {
  return (
    <Box.List>
      {list.map((item, index) => {
        return (
          <Box.ListItemButton
            disabled={disabled}
            onClick={() => onListItemClick(item.url)}
            style={{ borderRadius: "10px" }}
            key={index}
          >
            <Box.ListItemText>{item.url}</Box.ListItemText>
            <Box.ListItemText style={{ textAlign: "end" }}>
              <Box.Span>
                <Components.ServerStatusIndicator status={item.status} />
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
