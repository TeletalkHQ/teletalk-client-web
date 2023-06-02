import { Box } from "~/components/general/box";

import Img from "~/components/general/other/Img";

import { CountryItem, HTMLProps } from "~/types";

interface Props {
  option: CountryItem;
  props: HTMLProps;
}

const Option: React.FC<Props> = ({ props, option }) => (
  <Box.Flex {...props}>
    <Box.Div style={{ width: "90%" }}>
      <Box.Span style={{ marginRight: "5px" }}>
        <Img
          loading="lazy"
          alt={`${option.countryName}`}
          src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
          // srcSet={`https://flagcdn.com/w40/${option.countryShortName.toLowerCase()}.png 2x`}
          width="20"
        />
      </Box.Span>
      {option.countryName}
    </Box.Div>

    <Box.Div style={{ width: "10%" }}>+{option.countryCode}</Box.Div>
  </Box.Flex>
);

export default Option;
