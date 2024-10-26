import { useSelector } from "react-redux";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { generateAvatarPath } from "../../utility/AvatarConvert.js";

const NavBar = ({ title }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  function showScoreBoard() {
    navigate("/scores");
  }

  return (
    <nav>
      <div className="11">
        <img
          src="/logo192.png"
          style={{ height: "7vh" }}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="22">{title}</div>
      <div className="33" style={{ height: "100%", display: "flex" }}>
        <div
          style={{
            height: "100%",
            textAlign: "center",
            lineHeight: "100%",

            display: "flex",
          }}
        >
          <span
            style={{
              marginRight: "18px",
              border: "solid 1px white",
              display: user.isLoggedIn ? "inline-flex" : "none",
              padding: "3px",
              fontSize: "1rem",
              marginTop: "auto",
              marginBottom: "auto",
              height: "70%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
            onClick={showScoreBoard}
          >
            Score Range
          </span>
        </div>

        <div
          style={{
            height: "100%",
            display: "flex",
            textAlign: "center",
            lineHeight: "100%",
          }}
          onClick={() => {
            navigate("/setting");
          }}
        >
          <img
            src={generateAvatarPath(user.avatar)}
            style={{
              display: user.isLoggedIn ? "inline" : "none",
              width: "50px",
              height: "50px",
              marginTop: "auto",
              marginBottom: "auto",
              borderRadius: "50%",
            }}
          ></img>

          <span
            style={{
              marginLeft: "8px",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {user.isLoggedIn ? user.nickName : "Guest"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
