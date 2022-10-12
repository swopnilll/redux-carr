
import { useEffect } from "react";

import { nothing } from "immer";

import { useDispatch, useSelector } from "react-redux";


import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

import { calculateTotal } from "./features/cart/cartSlice";


function App() {
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpened } = useSelector((store) => store.modal)
  
  const dispatch = useDispatch();
  

  useEffect(( ) => {

    dispatch(calculateTotal())

  }, [cartItems])
  

  return (
    <main>
      <Navbar />
      {isOpened ? <Modal /> : nothing}
      <CartContainer />
    </main>
  );
}
export default App;
