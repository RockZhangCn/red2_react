import NavBar from "../components/Bar/Navbar.js";
import Footer from "../components/Bar/Footer.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add this import
import axios from "axios"; // Add this import
import { HTTP_SERVER } from "../server/Server.js";

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatar, setAvatar] = useState(0);
  const [error, setError] = useState(""); // 错误信息
  const avatars = Array.from(
    { length: 24 },
    (_, i) => `/avatar/icon_${i + 1}.png`,
  );

  // Example of extracting the number from the avatar string
  const extractNumber = (avatarPath) => {
    const match = avatarPath.match(/_(\d+)\.png/);
    return match ? Number(match[1]) : 0; // Returns the number or null if not found
  };

  const generateAvatarPath = (avatar) => {
    return `/avatar/icon_${avatar}.png`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      console.log(
        "We begin to register user",
        email,
        " password",
        password,
        "nickname",
        nickname,
        "avatar",
        avatar,
        " typeof avatar ",
        typeof avatar,
      );
      const response = await axios.post(HTTP_SERVER + "/register", {
        Email: email,
        Password: password,
        Nickname: nickname,
        Avatar: avatar,
      });
      console.log("Registration successful, client received", response.data);
      if (response.data.success) {
        alert("Register successed, redirect to login.");
        navigate("/"); // Redirect to home page on success
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Client: Registration failed", error);
      // Handle error (e.g., show an error message)
      //setError('Client: Registration failed', error);
    }
  };

  return (
    <>
      <NavBar title={"Register"} />
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <div className="col-md-6">
            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              {/* <h2 className="text-center mb-4">Register</h2> */}
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="nickname" className="form-label">
                  Nickname (for in-game display)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  style={{ marginTop: "10px" }}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value !== password) {
                      setPasswordError("Passwords do not match");
                    } else {
                      setPasswordError("");
                    }
                  }}
                  required
                />
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
                <small className="form-text text-muted">
                  Password must be at least 8 characters long.
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">
                  Select Avatar
                </label>
                <div className="mt-2">
                  {avatars.map((avatarPath) => (
                    <img
                      key={avatarPath}
                      src={avatarPath}
                      onClick={() => setAvatar(extractNumber(avatarPath))} // Update to set the selected avatar
                      style={{
                        margin: "2px",
                        display: "inline",
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                        border: `${generateAvatarPath(avatar) === avatarPath ? 2 : 0}px solid blue`,
                      }}
                      alt={avatarPath}
                    />
                  ))}
                </div>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <Link to="/" className="btn btn-secondary">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
