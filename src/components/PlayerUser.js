import { generateAvatarPath } from "../utility/AvatarConvert";
import InfoBoard from "./InfoBoard";
function PlayerUser({ avatar, nickname, horizontal }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "20%",
      }}
    >
      <img
        src={generateAvatarPath(avatar)}
        title={nickname}
        style={{
          display: horizontal ? "inline" : "block",
          margin: "0", // Adjust margin for horizontal alignment
          borderRadius: "50%",
          width: "auto", // Adjust size as needed
          height: "100%", // Adjust size as needed
          maxHeight: "7vh",
          maxWidth: "7vh",
        }}
      />
      <p
        style={{
          display: horizontal ? "inline" : "block",
          margin: "0", // Set margin to 0 for horizontal alignment
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {nickname}
      </p>

      <InfoBoard value="Game Information" />
    </div>
  );
}

export default PlayerUser;
