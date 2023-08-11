import React, { useState } from "react";
import "./login.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {
  const nav = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent in the request body
    const requestData = {
      loginId: loginId,
      password: password,
    };

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", requestData);

      if (response.status === 200) {
        console.log("Login successful");
        alert("Login successful");
        nav("/afterlogin");
        // Redirect or perform other actions on successful login
      } else {
        console.log("Login failed");
        alert("Login unsuccessful, try again!");
        // Handle login failure
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Login unsuccessful, try again!");
      // Handle error, show error messages, etc.
    }

    console.log("Login ID:", loginId);
    console.log("Password:", password);
  };
  const handelRegister = () => {
    nav("/signup");
  };

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  // const ID = "rajat@gmail.com";
  // const Pas = "123456";

  // const handelLogin = () => {
  //   if (loginId === ID && password === Pas) {
  //     nav("/afterlogin");
  //     alert("Success");
  //   } else {
  //     alert("Wrong Details Provided");
  //   }
  //};

  return (
    <Container
      fluid
      className="centered-card-container d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f542ef" }}
    >
      <Card
        className="custom-card"
        style={{
          background: "#007bff",
          minWidth: "380px",
          paddingTop: "10px",
          paddingLeft: "20px",
        }}
      >
        <Card.Body>
          <Card.Title className="text111" style={{ color: "white" }}>
            POWERPLUS365
            <a href="/">
              <img
                style={{
                  width: "30px",
                  height: "25px",
                  marginLeft: "25px",
                  marginBottom: "5px",
                }}
                src="https://cdn-icons-png.flaticon.com/128/8995/8995303.png"
                alt=""
              />
            </a>
          </Card.Title>

          <Card.Text>
            <div>
              <h2 style={{ color: "white", font: "inherit" }}>LOG IN</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    style={{
                      borderRadius: "10px",
                      textAlign: "center",
                      padding: "10px",
                      border: "none",
                      width: "100%",
                    }}
                    type="text"
                    placeholder="ID"
                    id="loginId"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <br />
                  <input
                    style={{
                      borderRadius: "10px",
                      textAlign: "center",
                      padding: "10px",
                      border: "none",
                      width: "100%",
                    }}
                    type={showPassword ? "text" : "password"} // Toggle between "text" and "password" based on showPassword state
                    placeholder="Your Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      margin: "auto", // Adjust the positioning of the button
                      color: "white",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide Password" : "Show Password"}
                  </button>
                </div>
                <br />
                <Link to="/forpas" style={{ color: "white" }}>
                  Forgot Password? <br />
                </Link>
                <br />
                <button
                  type="submit"
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    background: "#ffc107",
                    color: "#333",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onClick={handleSubmit}
                >
                  Log In
                </button>
                <br />
                <br />

                <button
                  type="submit"
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onClick={handelRegister}
                >
                  Register Now
                </button>

                <br />
                <br />
                <Link to="/demologin" style={{ color: "white" }}>
                  <p>Sign in with Demo User account? Click Here</p>
                </Link>
              </form>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
