import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/actions/cartAction";

const CartItem = ({ item }) => {
  const mobile = window.innerWidth <= 768;
  const dispatch = useDispatch();

  const subTotal = item.price * item.quantity;

  const increaseQuantity = (id, qty, stock) => {
    if (stock > qty) {
      dispatch(addItemToCart(id, qty + 1));
    }
  };

  const decreaseQuantity = (id, qty) => {
    if (qty > 1) {
      dispatch(addItemToCart(id, qty - 1));
    }
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="cart_item">
      <div className="cartItem_imageWrapper">
        <img src={item.imageUrl} alt="" />
      </div>
      <div className="cartItem_info">
        <div className="cartInfo_section">
          <Link to={`/product/${item.product}`} className="cartProductName">
            {item.name}
          </Link>
          <div className="cartTotalDiv">
            <p className="cartPrice">${item.price}</p>
            <p className="cartPriceTotal">${item.price * item.quantity}</p>
          </div>

          {mobile ? (
            <>
              <div className="cartButtons">
                <div className="cartproduct_quantity">
                  <button
                    onClick={() => {
                      decreaseQuantity(item.product, item.quantity);
                    }}
                  >
                    -
                  </button>
                  <input readOnly type="number" value={item.quantity} />
                  <button
                    onClick={() => {
                      increaseQuantity(item.product, item.quantity, item.stock);
                    }}
                  >
                    +
                  </button>
                </div>
                <p
                  className="removeButton"
                  onClick={() => {
                    removeItem(item.product);
                  }}
                >
                  Remove
                </p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="cartItem_buttons">
        <div className="cartButtons">
          <div className="cartproduct_quantity">
            <button
              onClick={() => {
                decreaseQuantity(item.product, item.quantity);
              }}
            >
              -
            </button>
            <input readOnly type="number" value={item.quantity} />
            <button
              onClick={() => {
                increaseQuantity(item.product, item.quantity, item.stock);
              }}
            >
              +
            </button>
          </div>
        </div>
        <p className="removeButton" onClick={() => removeItem(item.product)}>
          Remove
        </p>
      </div>
      <div className="cartItem_total">
        <div className="cartItem_subTotal">
          <span>${subTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
