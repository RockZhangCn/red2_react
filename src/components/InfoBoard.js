function InfoBoard({ value }) {
  return (
    <p
      style={{
        display: "inline",
        margin: "0",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textAlign: "center",
        width: "50%",
        color: "red",
        fontSize: "1rem",
      }}
    >
      {value}
    </p>
  );
}

export default InfoBoard;
