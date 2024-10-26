import NavBar from "../components/Bar/Navbar";
import Footer from "../components/Bar/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    // Handle password reset logic here
    console.log("Password reset submitted", {
      email,
      newPassword,
      confirmPassword,
      securityCode,
    });
  };

  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";

  return (
    <>
      <NavBar />
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
              <h2 className="text-center mb-4">Reset Password</h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Login Email
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
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="8"
                />
                <small className="form-text text-muted">
                  Password must be at least 8 characters long.
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {!passwordsMatch &&
                  newPassword !== "" &&
                  confirmPassword !== "" && (
                    <small className="form-text text-danger">
                      Passwords do not match.
                    </small>
                  )}
              </div>
              <div className="mb-3">
                <label htmlFor="securityCode" className="form-label">
                  Security Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="securityCode"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  required
                />
                <small className="form-text text-muted">
                  Enter the security code sent to your email.
                </small>
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!passwordsMatch}
                >
                  Reset Password
                </button>
                <Link to="/" className="btn btn-secondary">
                  Back to Login
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

export default ResetPassword;
