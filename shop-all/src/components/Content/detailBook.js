/* eslint-disable */

import { useEffect, useState, useContext } from "react";
import ReactiveButton from "reactive-button";
import { Helmet } from "react-helmet";
import { CartContext } from "../../cartContext";
import "./Content.css";
import "./bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import book1 from "../bg/book1.jpg";
import book2 from "../bg/book2.jpg";
import book3 from "../bg/book3.jpg";
import book4 from "../bg/book4.jpg";
import book5 from "../bg/book5.jpg";
import book6 from "../bg/book6.jpg";
import book7 from "../bg/book7.jpg";
import book8 from "../bg/book8.jpg";

export default function DetailBook() {
  const { cart, setCart } = useContext(CartContext); //untuk menerima data cart
  const [reactButton, setButton] = useState("idle");
  const bookId = localStorage.getItem("bookId");
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [currentBook, setCurrentBook] = useState({
    id: "",
    judul: "",
    konten: "",
    detail: "",
    harga: 0,
  });

  const navigate = useNavigate();

  const getBookImage = (idBook) => {
    switch (idBook) {
      case "1":
        return book1;
      case "2":
        return book2;
      case "3":
        return book3;
      case "4":
        return book4;
      case "5":
        return book5;
      case "6":
        return book6;
      case "7":
        return book7;
      case "8":
        return book8;
      default:
        return book1;
    }
  };

  useEffect(() => {
    const fetchBooks = () => {
      const bookData = require("../../db.json");
      const storedBookId = localStorage.getItem("bookId");
      const storedFirstName = localStorage.getItem("firstName");

      if (storedFirstName) {
        setFirstName(storedFirstName);
      }

      if (storedBookId) {
        const foundBook = bookData.kontenBook.find(
          (b) => b.id === storedBookId
        );
        if (foundBook) {
          setCurrentBook(foundBook);
        }
      }
    };

    fetchBooks();
  }, []);

  const addToCart = (event) => {
    event.preventDefault();
    const cartData = JSON.parse(localStorage.getItem("cart")) || []; //mengecek jumlah item cart
    const existingBook = cartData.find((b) => b.id === currentBook.id); //mencari id card berdasarkan id book
    setData((prevData) => [...prevData, currentBook]);
    setCart((prevCart) => [...prevCart, currentBook]);

    if (existingBook) {
      existingBook.countCart += 1;
      updateDbJsonCart(existingBook.id, existingBook.countCart);
    } else {
      cartData.push({
        //push data cart baru
        id: currentBook.id,
        judul: currentBook.judul,
        countCart: 1,
        harga: currentBook.harga,
      });
      updateDbJsonCart(currentBook.id, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const updateDbJsonCart = async (id, count) => {
    try {
      const response = await axios.patch(
        `http://localhost:2002/cartKonten/${id}`,
        {
          countCart: count,
        }
      );
      console.log("Updated db.json:", response.data);
    } catch (error) {
      console.error("Error updating db.json:", error);
    }
  };

  const onClickHandler = () => {
    setButton("loading");
    setTimeout(() => {
      setButton("success");
    }, 1000);
  };

  const totalPrice = firstName
    ? (currentBook.harga * 0.8 * data.length).toFixed(2)
    : (currentBook.harga * data.length).toFixed(2);

  if (!currentBook.id) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
        <title>Detail Book</title>
      </Helmet>

      <div className="news_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="news_taital">{currentBook.judul}</h1>
              <p className="news_text">{currentBook.konten}</p>
            </div>
          </div>
          <div className="news_section_2">
            <div className="row">
              <div className="col-md-6">
                <div className="news_img">
                  <img src={getBookImage(currentBook.id)} alt="Book Cover" />
                </div>
                <div className="empty"></div>
              </div>
              <div className="col-md-6">
                <h1 className="give_taital">About Author</h1>
                <ReactiveButton
                  color="yellow"
                  className="reactButton"
                  buttonState={reactButton}
                  idleText="Favorit"
                  loadingText="Loading"
                  successText="Done"
                  onClick={onClickHandler}
                />
                <p className="ipsum_text">{currentBook.detail}</p>
                <h5 className="raised_text">
                  Price: ${currentBook.harga}{" "}
                  <span className="goal_text">
                    Member: ${(currentBook.harga * 0.8).toFixed(2)}
                  </span>
                </h5>
                <div className="donate_btn_main">
                  <div className="readmore_btn">
                    <a href="#">Buy Now</a>
                  </div>
                  <div className="readmore_btn_1">
                    <a href="#" onClick={addToCart}>
                      Add To Cart
                    </a>
                  </div>
                  <br />
                </div>
                <p className="totalPrice">
                  Total Price: ${totalPrice} for {data.length} items
                </p>
              </div>
              <div className="empty"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
