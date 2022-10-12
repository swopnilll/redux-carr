import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotal } from "./features/cart/cartSlice";



function App() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  

  useEffect(( ) => {

    dispatch(calculateTotal())

  }, [cartItems])
  

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
