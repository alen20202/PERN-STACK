import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom"; // Removed Redirect (not used)
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();
      console.log(parseRes); // ✅ Debugging: Check what backend returns

      if (parseRes.token) { // ✅ Use 'token' instead of 'jwtToken' if API returns it
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          className="form-control my-3"
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          className="form-control my-3"
          placeholder="Enter Password"
        />
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};

export default Login;
