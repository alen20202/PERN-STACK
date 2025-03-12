import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom"; // Removed Redirect (not used)
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/authentication/register",
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
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register Error:", err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Enter Email"
          onChange={onChange}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter Password"
          onChange={onChange}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter Name"
          onChange={onChange}
          className="form-control my-3"
        />
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;
