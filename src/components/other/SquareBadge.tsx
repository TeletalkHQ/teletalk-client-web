const SquareBadge = ({ children, customStyle = {} }) => {
  return (
    <span
      style={{
        backgroundColor: "#4e6883",
        color: "white",
        borderRadius: "3px",
        padding: "3px 5px",
        textAlign: "center",
        ...customStyle,
      }}
    >
      {children}
    </span>
  );
};

export default SquareBadge;
