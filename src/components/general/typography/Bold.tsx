import Box from "~/components/general/box";
import { SpanProps } from "~/types";

interface Props extends SpanProps {}

const Bold: React.FC<Props> = ({ style = {}, children, ...rest }) => {
  return (
    <Box.Span
      {...rest}
      style={{
        ...style,
        fontWeight: style?.fontWeight || 600,
      }}
    >
      {children}
    </Box.Span>
  );
};

export default Bold;
