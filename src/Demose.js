import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Verification_Email.css";
import { useNavigate } from "react-router";
import AccServices from "./Services/AccServices";

function Verification_Email() {
  const nav = useNavigate();
  const cardStyle = {
    width: "600px",
    backgroundColor: "#3498db",
    color: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleGetOtp = async () => {
    try {
      setOtpLoading(true);
      // Replace the URL with your actual OTP API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/verify-email",
        { email: "user@example.com" } // Provide the email here
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
      const response = await AccServices.verifyemail({
        code: otp,
      });

      if (response.status === 200) {
        alert("Verification successful");
        nav("/login");
      } else {
        alert("Verification failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during verification");
    }
  };

  return (
    <center>
      <div className="verification-container">
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
