import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { RecoveryContext } from "/Users/joshuamacleod/Desktop/projects/Ecommerce/client/src/App.js";
import AdminImage from "../AdminImage.js";

function ForgottenPassword() {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    const { setEmail: setEmailContext, setOTP } = useContext(RecoveryContext);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeConfirmEmail = (e) => {
        setConfirmEmail(e.target.value);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (email === confirmEmail) {
            generateAndSendOTP(email);
        } else {
            setError("Emails do not match.");
        }
    };

    const generateAndSendOTP = async (email) => {
        try {
            const checkResponse = await fetch('http://localhost:4000/api/checkAdminEmailExistence', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
    
            if (checkResponse.ok) {
                const { exists } = await checkResponse.json();
    
                if (exists) {
                    const OTP = Math.floor(Math.random() * 9000 + 1000);
                    setOTP(OTP);
                    setEmailContext(email);
    
                    const body = { OTP, email };
    
                    const response = await fetch('http://localhost:4000/api/send-recovery-email', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    });
    
                    if (response.ok) {
                        toast.success("Recovery email sent successfully.");
                        navigate('/otp'); 
                    } else {
                        toast.error("Error sending recovery email.");
                        throw new Error(`Error sending recovery email: ${response.statusText}`);
                    }
                } else {
                    toast.error("This email is not registered in our system.");
                }
            } else {
                toast.error("Error checking email existence.");
                throw new Error(`Error checking email existence: ${checkResponse.statusText}`);
            }
        } catch (err) {
            console.error("Error in sending recovery email:", err.message);
        }
    };
    
    return (
        <div style={containerStyle}>
            <AdminImage />
            <form onSubmit={onSubmitForm} style={formStyle}>
            <h3 className="text-left my-5">Enter email to recover</h3>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control my-3"
                    value={email}
                    onChange={onChangeEmail}
                />
                <input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm Email"
                    className="form-control my-3"
                    value={confirmEmail}
                    onChange={onChangeConfirmEmail}
                />
                <button type="submit" style={buttonStyle} className="btn-block">Recover Password</button>
                <div className="forgot-register-links" style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to="/adminlogin">Login</Link>
                    <br />
                    <Link to="/adminregister">Register</Link>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
};

const formStyle = {
    marginLeft: '30px',
    marginRight: '200px',
    textAlign: 'center',
    minWidth: '300px',
};

const buttonStyle = {
    backgroundColor: '#8B57F9',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '5px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default ForgottenPassword;
