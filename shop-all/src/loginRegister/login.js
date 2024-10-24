/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Jangan lupa import stylesheet untuk toastify
import { useEffect, useState } from "react";
import "../index.css";
import { Helmet } from "react-helmet"; // Fixed casing here
import usersData from "../db.json";
import { useNavigate } from "react-router-dom";
import AppRouter from "../components/router/route"; /// Import router

function App() {
  /* eslint-disable no-unused-vars */
  const arah = useNavigate();
  const registerPage = () => {
    arah("/daftar"); // Navigate to login page
  };

  const [loginCheck, setLoginCheck] = useState({
    loggedIn: false,
    firstName: "",
  });

  const [user, setUser] = useState({
    nick: "",
    pass: "",
  });

  useEffect(() => {
    console.log("hello");
  }, []);

  const handleLogin = () => {
    // Mengambil data dari db.json
    const users = usersData.users; // Mengambil data pengguna dari db.json
    const foundUser = users.find(
      (nama) => nama.nick === user.nick && nama.pass === user.pass
    );

    if (foundUser) {
      // Jika pengguna ditemukan
      setLoginCheck({ loggedIn: true, firstName: foundUser.firstName });
      toast.success("Login successful"); // Menampilkan notifikasi sukses
      console.log("Login successful", foundUser.firstName);
      localStorage.setItem("firstName", foundUser.firstName); //simpan firstname yang login
      arah("/"); // Redirect ke home
      window.location.reload();
    } else {
      // Jika pengguna tidak ditemukan
      toast.error("Input salah"); // Menampilkan notifikasi error
      console.error("No user found with that nick and pass");
    }
  };

  // autofill
  const handleInputChange = (e) => {
    const { id, value } = e.target; //event menarget id class
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value, // Memperbarui nilai berdasarkan id input
    }));
  };

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle ">
        <div className="w-full max-w-xs">
          <form className="rounded px-8 pt-6 pb-8 mb-4 mt-20">
            <div className="mb-4 text-center">
              <Helmet>
                <title>Login Page</title>
              </Helmet>
              <h1 className="mb-5 ml-2">Login</h1>
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
                onChange={handleInputChange} // Menangani perubahan input
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
                onChange={handleInputChange} // Menangani perubahan input
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
                onClick={registerPage} // Menambahkan event onClick untuk login
              >
                Sign Up
              </button>
              <button
                className="btn mr-20 btn-primary"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <p className="pageCopy">&copy;2020 Acme Corp. All rights reserved.</p>
        <ToastContainer theme="dark" position="top-center" autoClose="1000" />
      </div>
    </>
  );
}

export default App;
