import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { RecoveryContext } from "../../../App.js";
import AdminImage from "../AdminImage.js";

function OTPInput() {
  const { email, otp } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const [otpInput, setOTPInput] = useState(["", "", "", ""]);

  const verifyOTP = () => {
    const enteredOTP = otpInput.join("");
    if (parseInt(enteredOTP) === otp) {
      navigate("/reset-password");
    } else {
      alert("The code you entered is incorrect. Please try again.");
    }
  };

  const handleChange = (index, value) => {
    const newInput = [...otpInput];
    newInput[index] = value;
    setOTPInput(newInput);
  };

  return (
    <div style={containerStyle}>
      <AdminImage />
      <div style={formContainerStyle}>
        <h4 style={{ textAlign: "left", marginTop: "4rem", marginLeft: "2rem" }}>
          We sent your OTP to: <p style={{ fontWeight: "normal", fontSize: "1rem", marginTop: "0.4rem", marginLeft: "1rem"  }}>{email}</p>
        </h4>
        <form style={formStyle}>
          <div style={otpContainerStyle}>
            {otpInput.map((digit, index) => (
              <div key={index} style={inputContainerStyle}>
                <input
                  maxLength="1"
                  value={digit}
                  style={inputStyle}
                  type="text"
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "1.4rem" }}>
            <button onClick={verifyOTP} style={buttonStyle}>
              Verify Account
            </button>
            <div className="forgot-register-links" style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to="/adminlogin">Login</Link>
                    <br />
                    <Link to="/forgottenpassword">Resend password</Link>
                </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: 'row',
  flexWrap: 'wrap',
};

const formContainerStyle = {
  marginLeft: "30px", 
};


const formStyle = {
  marginRight: '200px',
  textAlign: 'center',
  minWidth: '300px', 
};

const otpContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const inputContainerStyle = {
  margin: "10px",
};

const inputStyle = {
  width: "50px",
  height: "60px",
  textAlign: "center",
  outline: "none",
  border: "1px solid #ccc",
  borderRadius: "10px",
  fontSize: "1.5rem",
  backgroundColor: "white",
};

const buttonStyle = {
  width: "300px", 
  padding: "5px",
  backgroundColor: "#8B57F9",
  color: "white",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default OTPInput;
