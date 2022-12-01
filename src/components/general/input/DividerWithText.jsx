const DividerWithText = ({ style = {}, label }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          borderBottom: "2px solid lightgray",
          width: "95%",
          marginRight: "5px",
        }}
      />
      <div
        style={{
          padding: label ? "0px 10px" : "",
          margin: "5px 0px 10px",
          whiteSpace: "nowrap",
          color: "gray",
          fontWeight: "bold",
          ...style,
        }}
      >
        {label}
      </div>
      <div
        style={{
          borderBottom: "2px solid lightgray",
          width: "95%",
          marginLeft: "5px",
        }}
      />
    </div>
  );
};
export default DividerWithText;
