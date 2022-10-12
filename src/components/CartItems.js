import React from "react";
import { useDispatch } from "react-redux";

import {
  removeItemFromCart,
  incrementAmount,
  decrementAmount,
} from "../features/cart/cartSlice";

import { ChevronDown, ChevronUp } from "../icons";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  const onDeleteAmountOfItemClicked = () => {
    if (amount === 1) {
      dispatch(removeItemFromCart(id));
      return;
    }

    dispatch(decrementAmount({id}));
  };

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          className="remove-btn"
          onClick={() => dispatch(removeItemFromCart(id))}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(incrementAmount({ id }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => onDeleteAmountOfItemClicked()}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
