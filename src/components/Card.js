function Card({ value, long, horizontal, isLast, onClick, index, selected }) {
  if (horizontal) {
    // Check if it's the last image
    const style = isLast
      ? {
          transform:
            selected && value !== 55 ? "translateY(-20px)" : "translateY(0px)",
          height: "auto",
          width: "auto",
          transition: "transform 0.3s ease",
        }
      : {
          transform:
            selected && value !== 55 ? "translateY(-20px)" : "translateY(0px)",
          overflow: "hidden",
          height: "100%",
          textAlign: "center",
          width: "30px",
          transition: "transform 0.3s ease",
        };
    return (
      <div style={style}>
        <img
          className={"clickableimage"}
          alt={"/card/poker_" + value + ".png"}
          src={"/card/poker_" + value + ".png"}
          onClick={() => {
            onClick(index, value);
          }}
          style={{
            height: "100%",
            marginTop: "auto",
            marginBottom: "auto",
            width: "auto",
          }}
        />
      </div>
    );
  } else {
    // Adjust height for the last image
    const style = isLast
      ? { overflow: "hidden", textAlign: "center", height: "auto" }
      : { overflow: "hidden", textAlign: "center", height: "30px" };
    return (
      <div style={style}>
        <img
          src={"/card/poker_" + value + ".png"}
          alt={"/card/poker_" + value + ".png"}
          style={{
            width: long,
            marginLeft: "auto",
            marginRight: "auto",
            height: "auto",
          }}
        />
      </div>
    );
  }
}

export default Card;
