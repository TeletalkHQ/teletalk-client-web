import { ListItemProps } from "@mui/material";

import Box from "~/components/general/box";
import ListItem from "~/components/general/box/ListItem";
import Img from "~/components/general/other/Img";
import { CountryItem } from "~/types";

interface Props {
  option: CountryItem;
  props: ListItemProps;
}

const Option: React.FC<Props> = ({ props, option }) => (
  <ListItem {...props}>
    <Box.Div
      style={{
        width: "90%",
      }}
    >
      <Box.Span
        style={{
          marginRight: "5px",
        }}
      >
        <Img
          loading="lazy"
          alt={`${option.countryName}`}
          src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
          height={20}
          width={20}
        />
      </Box.Span>
      {option.countryName}
    </Box.Div>

    <Box.Div
      style={{
        width: "10%",
      }}
    >
      +{option.countryCode}
    </Box.Div>
  </ListItem>
);

export default Option;
