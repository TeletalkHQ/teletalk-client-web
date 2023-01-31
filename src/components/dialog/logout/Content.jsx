import { Box } from "src/components/general/box";

const Content = () => (
  <>
    <Box.Div style={{ textAlign: "center", fontSize: 18 }}>
      <Box.Span>Are you sure you want to</Box.Span>{" "}
      <Box.Span
        style={{
          fontWeight: 600,
        }}
      >
        logout?
      </Box.Span>
    </Box.Div>
  </>
);

export default Content;
