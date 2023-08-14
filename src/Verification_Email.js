import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Verification_Email.css";
import { useNavigate } from "react-router";

function Verification_Email() {
  const nav = useNavigate();
  const cardStyle = {
    width: "600px",
    backgroundColor: "#3498db", // Updated background color
    color: "white", // Text color
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
  };
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleGetOtp = async () => {
    try {
      setOtpLoading(true);
      const response = await axios.post(
        "YOUR_OTP_API_ENDPOINT", // Replace with your actual OTP API endpoint
        { email }
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP sent");
      alert("OTP sent");
    } catch (error) {
      console.error(error);
      alert("Network Error");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("YOUR_VERIFY_OTP_API_ENDPOINT", {
        email,
        otp,
      });

      if (response.status === 200) {
        setVerificationStatus("success");
        console.log("Verification code success");
        nav("/login");
      } else {
        setVerificationStatus("failure");
        console.log("Verification code failed");
        alert("Verification code failed");
      }
    } catch (error) {
      console.error(error);
      alert("Network Error");
    }
  };

  useEffect(() => {
    handleGetOtp();
  }, []);

  return (
    <center>
      <div className="verification-container">
        {" "}
        {/* Add a container for styling */}
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title className="verification-title">
                Verify your Email
              </Card.Title>
              <Card.Text>
                We have sent you a verification code on your email.
                <br />
                <h1 className="email">{email}</h1>
                <p>Please enter the code below</p>
                <div className="otp-input-container">
                  <input
                    className="otp-input"
                    placeholder="Enter verification code..."
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="send-otp-button"
                    onClick={handleGetOtp}
                    disabled={otpLoading}
                  >
                    {otpLoading ? "Sending..." : "Resend verification code"}
                  </button>
                </div>
                <div className="verify-button-container">
                  <button className="verify-button" onClick={handleVerifyOtp}>
                    Verify email
                  </button>
                </div>
                {verificationStatus === "failure" && (
                  <p className="error-message">
                    Invalid Verification code. Please try again.
                  </p>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </center>
  );
}

export default Verification_Email;
