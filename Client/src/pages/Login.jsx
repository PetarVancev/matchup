import React from "react";
import Form from "../components/Form";
if (window?.location.pathname === "/login") require("../loginStyles.css");

var userIsRegistered = false;

function Login() {
  return (
    <div className="container login">
      <Form registered={userIsRegistered} />
    </div>
  );
}

export default Login;
