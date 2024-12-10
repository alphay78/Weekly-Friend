import React, { useState } from "react";
import "./SignUp.css";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo">
          <img
            src="../../../public/bible.png"
            alt="Weekly Friends Logo"
            className="logo-image"
          />
          <h1 className="title">Weekly Friends</h1>
          <p className="subtitle">Philip 2:2</p>
        </div>
        <form>
          <input type="text" placeholder="Full Name" className="signup-input" />
          <input type="email" placeholder="Email" className="signup-input" />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="signup-input"
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible
                ? (pass = "../../../public/eyeSee.svg")
                : (pass = "../../../public/eyeHide.svg")}
              <img src={pass} alt="hide-see-image" />
            </span>
          </div>
          <a href="/signin" className="back-to-signin">
            Back to Sign In
          </a>
          <button type="submit" className="signup-button">
            Sign-Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
