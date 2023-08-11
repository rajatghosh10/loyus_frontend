import React from "react";
import "./Signup.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RegistrationForm = ({
  handleGetOtp,
  handleSubmit,
  handelLogin,
  handelBack,
  email,
  setEmail,
  otp,
  setOtp,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  referralCode,
  setReferralCode,
}) => {
  const [otpLoading, setOtpLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #e74c3c",
              marginBottom: "10px",
              fontSize: "16px",
            }}
            placeholder="Enter Email Id..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength="1"
            maxLength="50"
            required
          />
        </div>

        <div
          style={{
            textAlign: "Right",
            padding: "10px",
          }}
        >
          <button
            style={{
              background: "#e74c3c",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => {
              if (!otpLoading) {
                handleGetOtp();
              }
            }}
            disabled={otpLoading}
          >
            {otpLoading
              ? "Sending Verification code..."
              : "Get verification code"}
          </button>
        </div>
        <div>
          <input
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #e74c3c",
              marginBottom: "10px",
              fontSize: "16px",
            }}
            placeholder="Verification code here..."
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #e74c3c",
              marginBottom: "10px",
              fontSize: "16px",
            }}
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #e74c3c",
              marginBottom: "10px",
              fontSize: "16px",
            }}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password.length > 0 &&
            !password.match(
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
            ) && (
              <p style={{ color: "red" }}>
                Password must include at least one letter, one number, and one
                special character
              </p>
            )}
          {password.length > 0 &&
            (password.length < 8 || password.length > 20) && (
              <p style={{ color: "red" }}>
                Password must be between 8 and 20 characters
              </p>
            )}
          <div style={{ textAlign: "left" }}>
            <label className="text-white">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              Show Password
            </label>
          </div>
        </div>
        <div>
          <input
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #e74c3c",
              marginBottom: "10px",
              fontSize: "16px",
            }}
            placeholder=" Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {password !== confirmPassword && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
        </div>
        <div>
          <input
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #e74c3c",
              marginBottom: "10px",
              fontSize: "16px",
            }}
            placeholder=" Referral Code(optional)"
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>
        <u>
          <button
            style={{ color: "white", background: "blue", border: " none" }}
            onClick={handelBack}
          >
            Back
          </button>
        </u>
        <button
          type="submit"
          style={{
            background: "#32a851",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
          }}
          onClick={handleSubmit}
        >
          Register
        </button>
        <br />
        <br />
        <p style={{ color: "white" }}>
          Already have account? &nbsp;
          <button
            style={{ border: "0", color: "white", background: "blue" }}
            onClick={handelLogin}
          >
            <u> Login</u>
          </button>
        </p>
      </form>
    </>
  );
};

function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const minPasswordLength = 8;
    const maxPasswordLength = 22;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,22}$/;
    if (!password) {
      console.log("Password cannot be blank");
      alert("Password cannot be blank");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    if (!password.match(passwordRegex)) {
      console.log(
        "Password must include at least one letter, one number, and one special character"
      );
      alert(
        "Password must include at least one letter, one number, and one special character"
      );
      return;
    }

    if (
      password.length < minPasswordLength ||
      password.length > maxPasswordLength
    ) {
      console.log(
        `Password must be between ${minPasswordLength} and ${maxPasswordLength} characters`
      );
      alert(
        `Password must be between ${minPasswordLength} and ${maxPasswordLength} characters`
      );
      return;
    }
    const requestData = {
      email: email,
      otp: otp,
      name: username,
      Password: password,
      cpassword: confirmPassword,
      referralCode: referralCode,
    };

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", requestData);

      if (response.status === 200) {
        console.log("Registration successful");
        alert("Registration successful");
        nav("/login");
        // Redirect or perform other actions on successful login
      } else {
        console.log("Login failed");
        alert("Login unsuccessful");
        // Handle login failure
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Error");
      // Handle error, show error messages, etc.
    }
  };
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
      // You can handle the response as needed
    } catch (error) {
      console.error(error);
      alert("Error");
    } finally {
      setOtpLoading(false);
    }
  };
  const handelLogin = () => {
    nav("/login");
  };
  const handelBack = () => {
    nav("/");
  };
  return (
    <div>
      <Container
        fluid
        className="centered-card-container d-flex align-items-center justify-content-center"
        style={{ background: "#f542ef" }}
      >
        <Card className="custom-card">
          <Card.Body>
            <center>
              <Card.Title
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  fontSize: "30px",
                  fontWeight: "bolder",
                }}
              >
                {" "}
                POWERPLUS365
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                <p>Get your ready-made ID from whatsapp </p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <img
                      style={{ width: "40px", height: "50px" }}
                      src="https://dy9113ruvhojl.cloudfront.net/assets/images/diamond-upgrade-icn.png"
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <p>Diamond upgrade</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    <img
                      style={{ width: "40px", height: "50px" }}
                      src="https://dy9113ruvhojl.cloudfront.net/assets/images/customer-support-icn.png"
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    <p>1 to 1 customer support </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    <img
                      style={{ width: "40px", height: "50px" }}
                      src="https://dy9113ruvhojl.cloudfront.net/assets/images/instant-withdrawal-icn.png"
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    <p>24/7 instant withdrawal</p>
                  </div>
                </div>
                <div>
                  <Link to="/whatapp">
                    <button
                      style={{
                        background: "yellow",
                        width: "65%",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "8px",
                        border: "none",
                      }}
                    >
                      <img
                        style={{
                          verticalAlign: "middle",
                          marginRight: "15px",
                          padding: "10px",
                        }}
                        src="https://dy9113ruvhojl.cloudfront.net/assets/images/whatsApp-icon.svg"
                        alt=""
                      />

                      <span
                        className="blink-text"
                        style={{
                          flex: "1",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Whatsapp Now
                      </span>
                    </button>
                  </Link>
                </div>
                <br />

                <div className="custom-or">
                  <div className="custom-line"></div>
                  <div className="custom-text">OR</div>
                  <div className="custom-line"></div>
                </div>
              </Card.Text>
              <RegistrationForm
                handleGetOtp={handleGetOtp}
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                otp={otp}
                setOtp={setOtp}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                referralCode={referralCode}
                setReferralCode={setReferralCode}
                handelLogin={handelLogin}
                handelBack={handelBack}
              />
            </center>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Signup;
