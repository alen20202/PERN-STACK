import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",  // ✅ Changed from "POST" to "GET"
        headers: {
          "Authorization": `Bearer ${localStorage.token}`,  // ✅ Corrected JWT token format
          "Content-Type": "application/json"
        }
      });

      const parseData = await res.json();
      setName(parseData?.user_name || "User"); // ✅ Added fallback in case user_name is undefined
    } catch (err) {
      console.error("Error fetching profile:", err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error("Error during logout:", err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={logout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
