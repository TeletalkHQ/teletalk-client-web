import Box from "~/components/general/box";
import { Style } from "~/types";

interface Props {
  children: JSX.Element;
  overrideStyle?: Style;
}

const SquareBadge: React.FC<Props> = ({ children, overrideStyle = {} }) => {
  return (
    <Box.Span
      style={{
        backgroundColor: "#4e6883",
        color: "white",
        borderRadius: "3px",
        padding: "3px 5px",
        textAlign: "center",
        ...overrideStyle,
      }}
    >
      {children}
    </Box.Span>
  );
};

export default SquareBadge;
