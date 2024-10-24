/* eslint-disable */

import "./index.css";
import AppRouter from "./components/router/route";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Header from "./components/headerFooter/header";
import { CartProvider } from "./cartContext";
import { useLocation } from "react-router-dom"; // Import useLocation

function App() {
  useEffect(() => {}, []);

  const location = useLocation(); // Mendapatkan lokasi saat ini
  const isBookDetail = location.pathname === "/bookrinci"; // Periksa apakah saat ini di BookDetail

  return (
    <>
      <CartProvider>
        <Header />
        <AppRouter />
      </CartProvider>
      {/* {!isBookDetail && <Footer />}  */}
      {/* Tampilkan footer jika bukan di BookDetail */}
    </>
  );
}

export default App;
