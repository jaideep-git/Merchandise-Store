import React from "react";
import office from "../../assets/theoffice_600x.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/actions/cartAction";

const CartItem = ({ item }) => {
  const mobile = window.innerWidth <= 768;
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

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
        <img src={office} alt="" />
      </div>
      <div className="cartItem_info">
        <div className="cartInfo_section">
          <p className="cartProductName">{item.name}</p>
          <p className="cartPrice">${item.price}</p>
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
        <div>
          <span>${item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
