/* eslint-disable */

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet"; // Fixed casing here
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState({
    firstName: "", // Added firstName to the initial state
    nick: "",
    pass: "",
  });

  const arah = useNavigate();
  const loginPage = () => {
    arah("/login"); // Navigate to login page
  };

  const [loading, setLoading] = useState(false); // Loading state

  // Autofill
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleRegister = async () => {
    setLoading(true); // Start loading

    try {
      const response = await axios.get("http://localhost:2002/users"); // Get user data from API
      const users = response.data; // Get user data

      const foundUser = users.find((nama) => nama.nick === user.nick);
      if (foundUser) {
        toast.error("Username sudah terdaftar");
        console.error("Username sudah terdaftar");
      } else {
        const newUser = {
          id: (users.length + 1).toString(), // New ID
          firstName: user.firstName,
          nick: user.nick,
          pass: user.pass,
        };

        // Send new user data to server
        await axios.post("http://localhost:2002/users", newUser);
        toast.success("Registrasi berhasil!");
        console.log("Registrasi berhasil!", newUser);
        setUser({ firstName: "", nick: "", pass: "" }); // Reset form after registration
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mendaftar");
      console.error("Error registering user:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="w-full max-w-xs">
        <form className="rounded px-8 pt-6 pb-8 mb-4 mt-20">
          <div className="mb-4 text-center">
            <Helmet>
              <title>Register</title>
            </Helmet>
            <div>
              <h1 className="mb-2 ml-2">Daftar</h1>
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mx-2 mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow-sm appearance-none border rounded py-2 px-2 text-gray-700 leading-none w-full"
              id="firstName"
              type="text"
              placeholder="Firstname"
              value={user.firstName}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />

            <label
              className="block text-gray-700 text-sm font-bold mx-2 mb-1"
              htmlFor="nick"
            >
              Username
            </label>
            <input
              className="shadow-sm appearance-none border rounded py-2 px-2 text-gray-700 leading-none w-full"
              id="nick"
              type="text"
              placeholder="Username"
              value={user.nick}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </div>

          <div className="mb-4 text-center">
            <label
              className="block text-gray-700 text-sm font-bold mx-2 mb-1"
              htmlFor="pass"
            >
              Password
            </label>
            <input
              className="shadow-sm appearance-none border rounded py-2 px-2 text-gray-700 leading-none w-full"
              id="pass"
              type="password"
              placeholder="******************"
              value={user.pass}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <a
              className="align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-between text-center mb-6 mx-2">
            <button
              className="ml-4 btn btn-primary"
              type="button"
              onClick={handleRegister}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "Sign Up"} {/* Show loading status */}
            </button>
            <button
              className="btn mr-20 btn-primary"
              type="button"
              onClick={loginPage} // Corrected the redirect function
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex-grow" />
        <p className="text-center text-gray-500 text-xs mb-10 mt-auto">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
      <ToastContainer theme="dark" position="top-center" autoClose="1000" />
    </div>
  );
}

export default App;
