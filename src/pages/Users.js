import React, { useState } from "react";
import Appbar from "../components/Appbar";
import Banner from "../components/Banner";
import AboutUs from "../components/AboutUs";
import Meals from "../components/Meals";
import Cart from "../components/Cart";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import { CartProvider } from "../store/CartProvider";

const Users = () => {
  const [IsValid, setIsValid] = useState(false);
  const showModalHandler = () => setIsValid(true);
  const hideModalHandler = () => setIsValid(false);

  // Event to occur on Order
  const onOrderItems = () => {
    setIsValid(false);

    Swal.fire({
      title: "Successful!",
      text: "Your order is on the way",
      icon: "success",
    });
  };

  return (
    <CartProvider>
      <Appbar showModalHandler={showModalHandler} />
      {IsValid &&
        createPortal(
          <Cart
            hideModalHandler={hideModalHandler}
            onOrderItems={onOrderItems}
          />,
          document.body
        )}
      <Banner />
      <section>
        <AboutUs />
        <div>
          <Meals />
        </div>
      </section>
    </CartProvider>
  );
};

export default Users;
